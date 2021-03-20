/** @jsx jsx */
import { jsx } from '@emotion/core'
import { graphql, Link } from 'gatsby'

import { Layout } from '../components/Layout'

export default function Index({ data }) {
  return (
    <Layout
      css={{
        display: 'grid',
        gridGap: '4em',
        padding: '6em 2em',
      }}
    >
      <div
        css={{
          alignSelf: 'center',
          display: 'grid',
          gridAutoRows: 'max-content',
          gridGap: '0.5em',
        }}
      >
        <h1>Travis Arnold</h1>
        <h2 css={{ fontWeight: 300, color: 'rgb(173, 219, 103)' }}>
          Designer / Developer
        </h2>
      </div>
      <div
        css={{
          display: 'grid',
          gridAutoRows: 'max-content',
          gridGap: '0.5em',
        }}
      >
        <h3>Recent Posts</h3>
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
      filter: { fields: { slug: { ne: null, regex: "/^((?!drafts).)*$/" } } }
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
