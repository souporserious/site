/** @jsx jsx */
import { jsx } from './jsx'

import { Logo } from './logo'
import { HeadingUppercase, Spacer, XStack } from './ui-elements'

export function Header(props) {
  return (
    <XStack
      as="header"
      alignment="center"
      columns="auto minmax(64px, 1fr) auto"
      {...props}
    >
      <XStack alignment="center" columns="40px 1fr" spacing={8}>
        <Logo />
        <HeadingUppercase
          level={1}
          size="sm"
          hidden={true}
          states={{
            '@media (min-width: 544px)': {
              hidden: false,
            },
          }}
        >
          souporserious
        </HeadingUppercase>
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
