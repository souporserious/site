/** @jsx jsx */
import { jsx } from '@emotion/core'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { MDXProvider } from '@mdx-js/react'

import { nightOwl } from '../theme/night-owl'
import { fixOrphans } from '../utils'

const LiveCode = props => (
  <LiveProvider
    code={props.children.props.children.trim()}
    theme={nightOwl}
    noInline={true}
  >
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

const SyntaxHighligher = props => {
  const className = props.children.props.className || ''
  const matches = className.match(/language-(?<lang>.*)/)
  const language = (matches && matches.groups && matches.groups.lang) || ''
  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children.trim()}
      language={language}
      theme={nightOwl}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr minmax(auto, 32em) 1fr',
            gridColumn: '1/-1',
            padding: '1em 0',
            backgroundColor: nightOwl.plain.backgroundColor,
          }}
        >
          <pre
            className={className}
            css={{
              gridColumn: '2/3',
              fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
              fontSize: '0.6em',
            }}
            style={style}
          >
            {tokens.map((line, index) => (
              <div {...getLineProps({ line, key: index })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}

const createHeading = Tag => props => (
  <Tag id={props.id}>
    <a href={`#${props.id}`}>{props.children}</a>
  </Tag>
)

const components = {
  h2: createHeading(`h2`),
  h3: createHeading(`h3`),
  h4: createHeading(`h4`),
  p: ({ children, ...props }) => <p {...props}>{fixOrphans(children)}</p>,
  pre: props =>
    props.children.props.live ? (
      <LiveCode {...props} />
    ) : (
      <SyntaxHighligher {...props} />
    ),
}

export function Provider({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
