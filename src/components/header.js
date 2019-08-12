/** @jsx jsx */
import { jsx } from '@emotion/core'

import { Logo } from './logo'
import { Spacer, XStack } from './ui-elements'

export function Header(props) {
  return (
    <XStack
      alignment="center"
      columns={['auto', 'minmax(64px, 1fr)', 'auto']}
      {...props}
    >
      <XStack alignment="center" columns={['40px', '1fr']} spacing={8}>
        <Logo />
        <h1
          css={{
            fontSize: 20,
            textTransform: 'uppercase',
            letterSpacing: '0.20em',
            '@media (max-width: 640px)': {
              display: 'none',
            },
          }}
        >
          souporserious
        </h1>
      </XStack>

      <Spacer />

      <XStack
        as="nav"
        autoColumns="minmax(min-content, max-content)"
        spacing={32}
      >
        <a href="https://twitter.com/souporserious">Twitter</a>
        <a href="https://github.com/souporserious">Github</a>
        <a href="https://dribbble.com/souporserious">Dribbble</a>
      </XStack>
    </XStack>
  )
}
