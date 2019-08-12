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
      fontSizes: { xs: 11, sm: 14, md: 16, lg: 24, xl: 48 },
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
