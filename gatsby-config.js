module.exports = {
  siteMetadata: {
    siteUrl: `https://www.souporserio.us`,
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
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-slug`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-155297880-1`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-remark-reading-time`,
  ],
}
