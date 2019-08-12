import { css } from '@emotion/core'

export const breakpoints = {
  xs: `@media (min-width: 480px)`,
  sm: `@media (min-width: 600px)`,
  md: `@media (min-width: 840px)`,
  lg: `@media (min-width: 960px)`,
}

export const theme = [
  [
    breakpoints.xs,
    {
      fonts: { body: 'system-ui, sans-serif' },
      fontSizes: { xs: 11, sm: 14, md: 16, lg: 24, xl: 48 },
      fontWeights: { bold: 600 },
      colors: {
        primary: '#7de7aa',
        body: '#131721',
        heading: 'primary',
        anchor: 'primary',
        background: '#fff',
        foreground: 'primary',
      },
    },
  ],
  [
    breakpoints.md,
    {
      fontSizes: { md: 20, lg: 40, xl: 72 },
    },
  ],
  [
    `@media (prefers-color-scheme: dark)`,
    {
      fontWeights: { bold: 500 },
      colors: {
        body: '#fff',
        heading: '#fff',
        background: '#000',
      },
    },
  ],
]

function parseThemeValue(themeValue) {
  let properties = {}
  for (let themeValueKey in themeValue) {
    const props = themeValue[themeValueKey]
    for (let propKey in props) {
      const propValue = props[propKey]
      properties = {
        ...properties,
        [`--${themeValueKey}-${propKey}`]:
          typeof propValue === 'number' ? `${propValue}px` : propValue,
      }
    }
  }
  return properties
}

export function getThemeStyles(theme) {
  const styles = {}
  for (let themeBreakpoint in theme) {
    const [query, value] = theme[themeBreakpoint]
    styles[query] = parseThemeValue(value)
  }
  return css(styles)
}

export const themeStyles = getThemeStyles(theme)
