/** @jsx jsx */
import { Global, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { Link } from 'gatsby'

import { Head } from './Head'

export function Layout({ title, description, ...props }) {
  return (
    <Fragment>
      <Head title={title} description={description} />
      <Global
        styles={{
          'body,h1,h2,h3,h4,p,ol,ul,pre': {
            margin: 0,
          },
          html: {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '150%',
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: '0.015em',
            backgroundColor: 'hsl(210, 100%, 6%)',
            color: 'white',
          },
          h1: {
            fontSize: '3rem',
            lineHeight: 1,
          },
          h2: {
            fontSize: '1.6rem',
            lineHeight: 1.2,
          },
          h3: {
            fontSize: '1.3rem',
            lineHeight: 1.2,
          },
          h4: {
            fontSize: '1.1rem',
            lineHeight: 1.2,
          },
          a: {
            color: 'inherit',
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
            },
          },
          code: {
            margin: '-0.1em',
            padding: '0.1em',
            borderRadius: 5,
            backgroundColor: 'rgb(8, 25, 41)',
            color: 'rgb(173, 219, 103)',
          },
        }}
      />
      <div
        css={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          minHeight: '100vh',
        }}
      >
        <header
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2em',
          }}
        >
          <Link to="/">souporserious</Link>
          <nav
            css={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: 'min-content',
              gridGap: '1em',
              fontSize: '0.8rem',
            }}
          >
            <a href="https://twitter.com/souporserious">Twitter</a>
            <a href="https://github.com/souporserious">Github</a>
            <a href="https://dribbble.com/souporserious">Dribbble</a>
          </nav>
        </header>
        <main {...props} />
        <footer css={{ display: 'grid', padding: '1em' }}>
          <small
            css={{
              justifySelf: 'end',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            &copy; {new Date().getFullYear()} Travis Arnold
          </small>
        </footer>
      </div>
    </Fragment>
  )
}
