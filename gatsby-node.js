/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { GraphQLString } = require('gatsby/graphql');

/*
 Add year number (e.g. 2020),
 month number (e.g. 7),
 month name (e.g. July),
 and full URI (e.g. 2018-06-17-how-i-review-things)
 to Contentful Blog Posts
*/
exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === 'ContentfulBlogPost') {
    return {
      fullURI: {
        type: GraphQLString,
        resolve: (source) => {
          const date = new Date(source.publishDate);
          return `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}-${date.getDate().toLocaleString('en', { minimumIntegerDigits: 2 })}-${source.slug}`;
        },
      },
    };
  }
  return {};
};
