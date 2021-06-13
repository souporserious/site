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
        value: slug,
      })
      createNodeField({
        node,
        name: `isDraft`,
        value: source === 'drafts',
      })
    }
  }
}

exports.createPages = async ({ graphql, actions, reporter, getNode }) => {
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
            isDraft
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`🚨 ERROR: Loading "createPages" query`, result.errors)
  }

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const published = []
  const drafts = []

  result.data.allMdx.nodes.forEach((node) => {
    if (node.fields.isDraft) {
      drafts.push(node)
    } else {
      published.push(node)
    }
  })

  published.forEach((node, index) => {
    const previous = index < published.length - 1 ? published[index + 1] : null
    const next = index > 0 ? published[index - 1] : null
    actions.createPage({
      path: node.fields.slug,
      component: postTemplate,
      context: {
        id: node.id,
        previousId: previous ? previous.id : undefined,
        nextId: next ? next.id : undefined,
      },
    })
  })

  drafts.forEach((node) => {
    actions.createPage({
      path: node.fields.slug,
      component: postTemplate,
      context: {
        id: node.id,
        previousId: undefined,
        nextId: undefined,
      },
    })
  })
}
