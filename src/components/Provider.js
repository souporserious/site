/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { MDXProvider } from '@mdx-js/react'
import { preToCodeBlock } from 'mdx-utils'

import { nightOwl } from '../theme/night-owl'
import { calculateLinesToHighlight } from '../utils'

function Newsletter() {
  return (
    <a>
      If you're curious about similar content or want to chat more about these
      topics, sign up for my newsletter below to get notified when new content
      comes out.
    </a>
  )
}

function CodeLink({ column, row, children }) {
  // const props = useCodeLink(column, row)
  return <a>{children}</a>
}

function LiveCode({ codeString }) {
  return (
    <LiveProvider code={codeString} theme={nightOwl} noInline={true}>
      <div
        css={{
          gridColumn: '1/-1',
          display: 'grid',
          gridTemplateColumns: '1fr 32em 1fr 1fr',
          position: 'relative',
          backgroundColor: nightOwl.plain.backgroundColor,
        }}
      >
        <LiveEditor
          padding={0}
          css={{
            gridColumn: '2',
            fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
            fontSize: '0.6em',
            ':focus-within': {
              backgroundColor: 'hsl(206, 90%, 14%)',
            },
            '> textarea, > pre': {
              gridColumn: '2/3',
              outline: 0,
              ':hover': {
                backgroundColor: 'hsl(206, 90%, 14%)',
              },
            },
          }}
          style={{
            fontFamily: undefined,
            padding: undefined,
            backgroundColor: undefined,
          }}
        />
        <LivePreview
          css={{
            alignSelf: 'start',
            gridColumn: '3',
            padding: '1em',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
          }}
        />
        <LiveError
          css={{
            gridColumn: '1/-1',
            gridRow: '2',
            padding: '1em',
            backgroundColor: '#d83d3d',
            color: 'white',
            position: 'sticky',
            bottom: 0,
          }}
        />
        {/* <div
        css={{
          gridColumn: '1',
          gridRow: '1',
          padding: '0.5em',
          backgroundColor: 'white',
          color: 'black',
          //   position: 'absolute',
          //   top: '1em',
          //   left: '1em',
        }}
      >
        Live
      </div> */}
      </div>
    </LiveProvider>
  )
}

function SyntaxHighligher({ codeString, language, metastring }) {
  const linesToHighlight = metastring
    ?.split(' ')
    .find((part) => part.startsWith('{') && part.endsWith('}'))
  const filename = metastring
    ?.split(' ')
    .find((part) => part.startsWith('filename'))
    ?.split('=')[1]
  const hideNumbers =
    metastring?.split(' ').find((part) => part === 'hideNumbers') ||
    language === 'bash'
  const shouldHighlightLine = calculateLinesToHighlight(linesToHighlight)
  const [justCopied, setJustCopied] = useState(false)
  return (
    <div
      css={{
        display: 'grid',
        gridColumn: '1 / -1',
        ':hover button': {
          opacity: 1,
        },
      }}
    >
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={nightOwl}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            css={{
              display: 'grid',
              gridTemplateColumns: '1fr minmax(auto, 32em) 1fr',
              gridArea: '1 / 1 / 1 / 1',
              maxWidth: '100%',
              padding: filename ? '0 0 1em' : '1em 0',
              backgroundColor: nightOwl.plain.backgroundColor,
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {filename && (
              <div
                css={{
                  gridColumn: '2/3',
                  gridRow: 1,
                  display: 'flex',
                  padding: '1em 0 0.5em',
                }}
              >
                <span
                  css={{
                    fontSize: '0.65rem',
                    padding: '0.25em 0.35em',
                    marginLeft: '-0.35em',
                    borderRadius: '0.25em',
                    backgroundColor: '#043a6d',
                  }}
                >
                  {filename}.{language}
                </span>
              </div>
            )}
            <pre
              className={className}
              css={{
                gridColumn: '2/3',
                gridRow: filename ? 2 : 1,
                fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
                fontSize: '0.6em',
              }}
              style={style}
            >
              {tokens.map((line, index) => (
                <div
                  {...getLineProps({ line, key: index })}
                  css={{
                    display: 'flex',
                    backgroundColor: shouldHighlightLine(index)
                      ? 'hsl(209, 58%, 14%)'
                      : undefined,
                  }}
                >
                  <span
                    css={{
                      display: 'inline-block',
                      width: '2ch',
                      padding: '0 0.5ch',
                      marginRight: '1ch',
                      textAlign: 'right',
                      borderLeft: '0.25em solid',
                      borderLeftColor: shouldHighlightLine(index)
                        ? 'rgb(173, 219, 103)'
                        : 'transparent',
                      backgroundColor: shouldHighlightLine(index)
                        ? 'hsl(209, 58%, 14%)'
                        : nightOwl.plain.backgroundColor,
                      color: 'rgba(255,255,255,0.46)',
                      userSelect: 'none',
                      position: 'sticky',
                      left: 0,
                      opacity: hideNumbers ? 0 : 1,
                      '@media screen and (min-width: 600px)': {
                        marginLeft: '-4.5ch',
                      },
                    }}
                  >
                    {index + 1}
                  </span>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
      <div
        css={{
          gridArea: '1 / 1 / 1 / 1',
          display: 'grid',
          gridTemplateColumns: '1fr minmax(auto, 32em) 1fr',
          position: 'relative',
        }}
      >
        <button
          css={{
            justifySelf: 'end',
            gridColumn: 2,
            position: 'absolute',
            top: '1em',
            right: '1em',
            padding: '0.5em',
            border: 'none',
            borderRadius: '0.15em',
            backgroundColor: 'transparent',
            color: '#afd6fb',
            opacity: 0,
            ':hover': {
              backgroundColor: '#ffffff14',
            },
          }}
          onClick={() => {
            navigator.clipboard.writeText(codeString)
            setJustCopied(true)
            setTimeout(() => {
              setJustCopied(false)
            }, 1000)
          }}
          children={justCopied ? 'Copied' : 'Copy'}
        />
      </div>
    </div>
  )
}

const createHeading = (Tag) => (props) => (
  <Tag id={props.id}>
    <a href={`#${props.id}`} css={{ textDecoration: 'none !important' }}>
      {props.children}
    </a>
  </Tag>
)

const components = {
  h2: createHeading(`h2`),
  h3: createHeading(`h3`),
  h4: createHeading(`h4`),
  pre: (props) => {
    const codeProps = preToCodeBlock(props)
    if (codeProps) {
      if (props.children.props.live) {
        return <LiveCode {...codeProps} />
      } else {
        return <SyntaxHighligher {...codeProps} />
      }
    } else {
      return <pre {...props} />
    }
  },
  CodeLink,
}

export function Provider({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
