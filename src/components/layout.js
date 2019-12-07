/** @jsx jsx */
import { jsx } from '../components/jsx'
import { Global } from '@emotion/core'
import { Fragment } from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { MDXProvider } from '@mdx-js/react'

import { Spacer, XStack, YStack } from '../components/ui-elements'
import { Header } from '../components/header'
import { breakpoints, themeStyles, getProperty } from '../theme'

import '../css/prism-theme.css'

const EDITOR_THEME = {
  plain: {},
  styles: [],
}

const LiveCode = props => (
  <LiveProvider
    code={props.children.props.children.trim()}
    theme={EDITOR_THEME}
    mountStylesheet={false}
  >
    <LiveEditor
      style={{
        fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
        fontSize: 16,
        backgroundColor: 'rgb(20, 26, 31)',
        color: 'rgb(255, 255, 255)',
      }}
    />
    <LiveError />
    <LivePreview />
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
      theme={EDITOR_THEME}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

const components = {
  pre: props =>
    props.children.props.live ? (
      <LiveCode {...props} />
    ) : (
      <SyntaxHighligher {...props} />
    ),
}

export default ({ children }) => (
  <Fragment>
    <Global
      styles={{
        ':root': themeStyles,
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          backgroundColor: getProperty('colors', 'background'),
        },
        body: {
          margin: 0,
          fontFamily: getProperty('fonts', 'body'),
          color: getProperty('colors', 'body'),
        },
        a: {
          color: getProperty('colors', 'anchor'),
        },
        'h1,h2,h3,h4,h5,h6': {
          margin: 0,
          color: getProperty('colors', 'heading'),
        },
      }}
    />
    <XStack columns={['1fr', 'minmax(0, 960px)', '1fr']}>
      <Spacer />

      <YStack
        width="100%"
        maxWidth={960}
        minHeight="100vh"
        padding={16}
        rows={['auto', '64px', '1fr']}
        states={{
          [breakpoints.sm]: {
            padding: 32,
          },
        }}
      >
        <Header />
        <Spacer />
        <YStack as="main">
          <MDXProvider components={components}>{children}</MDXProvider>
        </YStack>
      </YStack>
    </XStack>
  </Fragment>
)
