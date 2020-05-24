const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    query {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMdx.nodes.forEach((post, index, posts) => {
    const previous = posts[index - 1];
    const next = posts[index + 1];

    createPage({
      path: post.fields.slug,
      component: path.resolve('src/templates/post.js'),
      context: {
        slug: post.fields.slug,
        previous: previous && previous.fields.slug,
        next: next && next.fields.slug,
      },
    });
  });
};
