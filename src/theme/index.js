import { getThemeStyles } from './utils'
export { createProperty, getProperty } from './utils'

export const breakpoints = {
  xs: `@media (min-width: 0px)`,
  sm: `@media (min-width: 600px)`,
  md: `@media (min-width: 840px)`,
  lg: `@media (min-width: 960px)`,
}

export const themeStyles = getThemeStyles([
  [
    breakpoints.xs,
    {
      fonts: { body: 'system-ui, sans-serif' },
      fontSizes: { xs: 11, sm: 12, md: 14, lg: 32, xl: 48 },
      fontWeights: { bold: 600 },
      colors: {
        primary: '#7de7aa',
        background: '#131721',
        foreground: 'primary',
        body: '#fff',
        heading: 'primary',
        anchor: 'primary',
        mainHeading: '#fff',
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
      colors: { background: '#000' },
    },
  ],
])
