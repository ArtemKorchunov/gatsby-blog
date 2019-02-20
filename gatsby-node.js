const path = require("path");

const createTagPage = (createPage, posts) => {
  const allTagsIndexTemplates = path.resolve("src/templates/allTagsIndex.js");
  const singleTagIndexTemplates = path.resolve(
    "src/templates/singleTagIndex.js"
  );

  const postByTag = {};
  posts.forEach(({ node }) => {
    const tags = node.frontmatter.tags;
    if (tags) {
      tags.forEach(tag => {
        if (!postByTag[tag]) {
          postByTag[tag] = [];
        }
        postByTag[tag].push(node);
      });
    }
  });

  const tags = Object.keys(postByTag);

  createPage({
    path: "/tags",
    component: allTagsIndexTemplates,
    context: {
      tags: tags.sort()
    }
  });

  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: singleTagIndexTemplates,
      context: {
        posts: postByTag[tag]
      }
    });
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((res, rej) => {
    const blogPostTemplate = path.resolve("src/templates/blogPost.js");
    res(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: ASC, fields: [frontmatter___date] }
            ) {
              edges {
                node {
                  frontmatter {
                    path
                    tags
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        const edges = result.data.allMarkdownRemark.edges;

        createTagPage(createPage, edges);

        edges.forEach(({ node }, index) => {
          const path = node.frontmatter.path;

          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path,
              next: edges.length - 1 === index ? null : edges[index + 1].node,
              prev: index === 0 ? null : edges[index - 1].node
            }
          });
        });
      })
    );
  });
};
