/** @jsx jsx */
import { jsx, Global } from '@emotion/core'
import { Fragment } from 'react'

import { Heading, Spacer, XStack, YStack } from '../components/ui-elements'
import { Header } from '../components/header'
import { LastPlayed } from '../components/last-played'
import { theme, themeStyles } from '../theme'

export default () => (
  <Fragment>
    <Global
      styles={{
        ':root': themeStyles,
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          backgroundColor: 'var(--colors-background)',
        },
        body: {
          margin: 0,
          fontFamily: 'var(--fonts-body)',
          color: 'var(--colors-body)',
        },
        a: {
          color: 'var(--colors-anchor)',
        },
        'h1,h2,h3,h4,h5,h6': {
          margin: 0,
          color: 'var(--colors-heading)',
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
        padding={32}
        rows={[
          'auto',
          'minmax(54px, 1fr)',
          'auto',
          'minmax(96px, 2fr)',
          'auto',
        ]}
      >
        <Header />

        <Spacer />

        <YStack>
          <Heading level={2} size="xl">
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
