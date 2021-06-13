/** @jsx jsx */
import { jsx } from '@emotion/core'
import { graphql, Link } from 'gatsby'

import { Layout } from '../components/Layout'

export default function Drafts({ data }) {
  return (
    <Layout
      noIndex
      css={{
        display: 'grid',
        gridGap: '4em',
        padding: '6em 2em',
      }}
    >
      <h1>Drafts</h1>
      <div
        css={{
          display: 'grid',
          gridAutoRows: 'max-content',
          gridGap: '0.5em',
        }}
      >
        {data.posts.nodes.map((post) => (
          <Link
            key={post.frontmatter.title}
            to={post.fields.slug}
            css={{ fontSize: '1.5em' }}
          >
            {post.frontmatter.title}
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    posts: allMdx(
      filter: { fields: { isDraft: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`
