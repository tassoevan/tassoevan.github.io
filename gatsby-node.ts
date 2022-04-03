import { createFilePath } from 'gatsby-source-filesystem';
import { resolve } from 'path';
import type { GatsbyNode } from 'gatsby';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions: { createNodeField },
  getNode,
}) => {
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({
  actions: { createPage },
  graphql,
}) => {
  const { data, errors } = await graphql<{
    allMdx: {
      nodes: {
        fields: { slug: string };
        frontmatter: { title: string };
      }[];
    };
  }>(`
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

  if (errors) {
    throw errors;
  }

  data?.allMdx.nodes.forEach((post, index, posts) => {
    const next = posts[index + 1];

    createPage({
      path: post.fields.slug,
      component: resolve('src/templates/post.tsx'),
      context: {
        slug: post.fields.slug,
        next: next && {
          slug: next.fields.slug,
          title: next.frontmatter.title,
        },
      },
    });
  });
};
