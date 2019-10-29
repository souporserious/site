/** @jsx jsx */
import { jsx } from '../components/jsx'
import { Global } from '@emotion/core'
import { Fragment } from 'react'

import { Heading, Spacer, XStack, YStack } from '../components/ui-elements'
import { Header } from '../components/header'
import { LastPlayed } from '../components/last-played'
import { breakpoints, themeStyles, getProperty } from '../theme'

export default () => (
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
        as="main"
        width="100%"
        maxWidth={960}
        minHeight="100vh"
        padding={16}
        rows="auto minmax(54px, 1fr) auto minmax(96px, 2fr) auto"
        states={{
          [breakpoints.sm]: {
            padding: 32,
          },
        }}
      >
        <Header />

        <Spacer />

        <YStack>
          <Heading level={2} size="xl" color="main-heading">
            Travis Arnold
          </Heading>
          <Heading level={3} size="lg">
            designer / developer
          </Heading>
        </YStack>

        <Spacer />

        <LastPlayed />
      </YStack>

      <Spacer />
    </XStack>
  </Fragment>
)
