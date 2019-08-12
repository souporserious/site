/** @jsx jsx */
import { jsx, Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import { Heading, Spacer, XStack, YStack } from '../components/ui-elements'
import { Header } from '../components/header'
import { LastPlayed } from '../components/last-played'

const colors = {
  primary: '#7de7aa',
}

const appTheme = {
  fontFamily: 'system-ui, sans-serif',
  colors: {
    body: {
      color: '#fff',
    },
    heading: {
      color: colors.primary,
    },
    anchor: {
      color: colors.primary,
    },
    background: '#131721',
    foreground: colors.primary,
  },
  fontSizes: {
    xs: 11,
    sm: 14,
    md: 20,
    lg: 40,
    xl: 72,
  },
  fontWeights: {
    bold: 600,
  },
}

export default () => (
  <ThemeProvider theme={appTheme}>
    <Global
      styles={theme => ({
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          fontFamily: theme.fontFamily,
          backgroundColor: theme.colors.background,
        },
        body: {
          margin: 0,
          ...theme.colors.body,
        },
        a: {
          ...theme.colors.anchor,
        },
        'h1,h2,h3,h4,h5,h6': {
          margin: 0,
          ...theme.colors.heading,
        },
      })}
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
          <Heading level={2} size="xl" color="#fff">
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
  </ThemeProvider>
)
