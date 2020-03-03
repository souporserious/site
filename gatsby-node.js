const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createPrinterNode } = require(`gatsby-plugin-printer`)

exports.onCreateNode = async ({ actions, createNodeId, getNode, node }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)
    const source = fileNode.sourceInstanceName
    const slug = createFilePath({ node, getNode })
    if (['drafts', 'posts'].includes(source)) {
      createNodeField({
        node,
        name: `slug`,
        value: source === 'drafts' ? `/drafts${slug}` : slug,
      })
    }
    if (source === 'posts') {
      createPrinterNode({
        id: createNodeId(`${node.id} >>> Printer`),
        fileName: slug.slice(0, -1),
        outputDir: `opengraph`,
        data: node,
        component: path.resolve(`./src/templates/opengraph.js`),
      })
    }
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(
        filter: { fields: { slug: { ne: null } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`🚨 ERROR: Loading "createPages" query`, result.errors)
  }

  const posts = result.data.allMdx.nodes

  posts.forEach((node, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        previousId: previous ? previous.id : undefined,
        nextId: next ? next.id : undefined,
      },
    })
  })
}
