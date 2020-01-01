/** @jsx jsx */
import { jsx } from '@emotion/core'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { Layout } from '../components/Layout'
import { Provider } from '../components/Provider'
import { fixOrphans } from '../utils'

export default function Post(props) {
  const { mdx, previous, next } = props.data
  const { body, excerpt, fields, frontmatter } = mdx
  const { date, summary, tags, title } = frontmatter
  return (
    <Layout title={title} description={summary || excerpt} keywords={tags}>
      <section>
        <article
          css={{
            display: 'grid',
            gridTemplateColumns: [
              'minmax(16px, 1fr)',
              'minmax(auto, 32em)',
              'minmax(16px, 1fr)',
            ].join(' '),
            gridRowGap: '1em',
            '> *': {
              gridColumn: '2',
            },
            a: {
              textDecoration: 'underline',
            },
          }}
        >
          <div
            css={{
              display: 'grid',
              gridGap: '0.5em',
            }}
          >
            <h1>{fixOrphans(title)}</h1>
            <small css={{ color: 'rgba(255,255,255,0.64)' }}>
              {fields.readingTime.text}
            </small>
            {summary && (
              <p
                css={{
                  fontSize: '1.3rem',
                  lineHeight: 1.3,
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                {fixOrphans(summary)}
              </p>
            )}
          </div>
          <Provider>
            <MDXRenderer>{body}</MDXRenderer>
          </Provider>
          <div
            css={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: 'max-content',
              gridGap: '1em',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1em 0',
            }}
          >
            <small css={{ color: 'rgba(255,255,255,0.65)' }}>
              Updated: <time>{date}</time>
            </small>
            <ul
              css={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: 'min-content',
                gridGap: '1em',
                fontSize: '0.8rem',
                padding: 0,
                listStyle: 'none',
              }}
            >
              {tags.map(tag => (
                <li
                  key={tag}
                  css={{
                    padding: '0.25em 0.5em',
                    borderRadius: '0.25em',
                    backgroundColor: 'hsl(209, 67%, 10%)',
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          {(previous || next) && (
            <div
              css={{
                gridColumn: '1/-1',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                padding: '1em',
                backgroundColor: 'hsl(209, 67%, 10%)',
              }}
            >
              {previous && (
                <Link
                  to={previous.fields.slug}
                  css={{
                    gridColumn: '1',
                    justifySelf: 'start',
                    textAlign: 'left',
                  }}
                >
                  <div>Previous post</div>
                  <strong>{previous.frontmatter.title}</strong>
                </Link>
              )}
              {next && (
                <Link
                  to={next.fields.slug}
                  css={{
                    gridColumn: '2',
                    justifySelf: 'end',
                    textAlign: 'right',
                  }}
                >
                  <div>Next post</div>
                  <strong>{next.frontmatter.title}</strong>
                </Link>
              )}
            </div>
          )}
        </article>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($id: String!, $previousId: String, $nextId: String) {
    mdx(id: { eq: $id }) {
      body
      excerpt(pruneLength: 140)
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        date(formatString: "MM/DD/YYYY")
        summary
        tags
        title
      }
    }
    previous: mdx(id: { eq: $previousId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    next: mdx(id: { eq: $nextId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
