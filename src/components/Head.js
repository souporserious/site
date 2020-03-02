import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import favicon from '../images/favicon.ico'

export function Head({
  title,
  description,
  lang = `en`,
  meta = [],
  keywords = [],
  noIndex,
}) {
  const hasTitle = Boolean(title)
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={hasTitle ? title : site.siteMetadata.title}
      titleTemplate={hasTitle ? `%s | ${site.siteMetadata.title}` : `%s`}
      meta={[
        noIndex && {
          name: `robots`,
          content: `noindex`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:site`,
          content: `@souporserious`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
      ]
        .filter(Boolean)
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    >
      <link rel="icon" href={favicon} />
    </Helmet>
  )
}
