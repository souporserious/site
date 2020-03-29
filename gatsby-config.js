module.exports = {
  siteMetadata: {
    siteUrl: `https://www.souporserious.com`,
    title: `souporserious`,
    author: `Travis Arnold`,
    description: `All things design and development.`,
    social: [
      {
        name: `Twitter`,
        url: `https://twitter.com/souporserious`,
      },
      {
        name: `GitHub`,
        url: `https://github.com/souporserious`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `drafts`,
        path: `${__dirname}/src/drafts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-slug`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-155297880-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            query: `
              {
                allMdx(
                  filter: { fields: { slug: { ne: null } } }
                  sort: { fields: frontmatter___date, order: DESC }
                ) {
                  nodes {
                    excerpt(pruneLength: 140)
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      date
                      summary
                      tags
                      title
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => ({
                title: node.frontmatter.title,
                description: node.frontmatter.summary || node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }],
              }))
            },
            output: '/rss.xml',
            title: 'souporserious RSS feed',
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-remark-reading-time`,
  ],
}
