import { createFilePath } from 'gatsby-source-filesystem';
import { resolve } from 'path';
import readingTime from 'reading-time';

import type { GatsbyNode } from 'gatsby';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions: { createNodeField },
  getNode,
}) => {
  if (node.internal.type === 'Mdx') {
    createNodeField({
      name: 'slug',
      node,
      value: createFilePath({ node, getNode }),
    });

    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body as string),
    });
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`#graphql
    type Mdx implements Node {
      # You can also use other keys from fields.timeToRead if you don't want "minutes"
      timeToRead: Float @proxy(from: "fields.timeToRead.minutes")
      wordCount: Int @proxy(from: "fields.timeToRead.words")
    }
  `);
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
        internal: { contentFilePath: string };
      }[];
    };
  }>(`
    query {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
          internal {
            contentFilePath
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

    const component = `${resolve(
      './src/templates/post.tsx'
    )}?__contentFilePath=${post.internal.contentFilePath}`;

    createPage({
      path: post.fields.slug,
      component,
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
