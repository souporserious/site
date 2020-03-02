const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)
    const source = fileNode.sourceInstanceName
    if (['drafts', 'posts'].includes(source)) {
      const slug = createFilePath({ node, getNode })
      createNodeField({
        node,
        name: `slug`,
        value: source === 'drafts' ? `/drafts${slug}` : slug,
      })
    }
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
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
    actions.createPage({
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
