import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import RichText from '../components/Contentful/RichText';

function BlogPost({ data }) {
  const {
    title, coverImage, fromDate, publishDate, summary, nsfw, content,
  } = data.blogPost;

  return (
    <Layout>
      <SEO
        title={
        nsfw ? `[NSFW] Blog: ${title}` : `Blog: ${title}`
      }
        description={summary.summary}
      />
      <div className="container">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/blog/">Blog</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{title}</li>
              </ol>
            </nav>
            <div className="card mb-4">
              { coverImage.fluid && (
                <picture>
                  <source type="image/webp" srcSet={coverImage.fluid.srcSetWebp} />
                  <source type="image/png" srcSet={coverImage.fluid.srcSet} />
                  <img className="card-img-top" src={coverImage.fluid.src} alt={coverImage.description} />
                </picture>
              )}
              <div className="card-body">
                { !coverImage.fluid && (
                <h1 className="card-title display-1 text-center">{ title }</h1>
                )}
                <p className="lead text-center">{summary.summary}</p>
                <hr />
                <RichText json={content.json} />
              </div>
              <div className="card-footer">
                <p>
                  Posted
                  {' '}
                  <span
                    className="text-decoration-underline"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={publishDate}
                  >
                    {fromDate}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogPost;

export const pageQuery = graphql`
query BlogPostQuery($fullURI: String!) {
  blogPost: contentfulBlogPost(fullURI: {eq: $fullURI}) {
    title
    coverImage {
      fluid {
        src
        srcSet
        srcSetWebp
      }
      description
    }
    fromDate: publishDate(fromNow: true)
    publishDate(formatString: "MMMM Do, YYYY")
    summary {
      summary
    }
    nsfw
    content {
      json
    }
  }
}

`;

BlogPost.propTypes = {
  data: PropTypes.shape({
    blogPost: PropTypes.shape({
      title: PropTypes.string.isRequired,
      summary: PropTypes.objectOf(PropTypes.string).isRequired,
      coverImage: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.shape({
          fluid: PropTypes.shape({
            src: PropTypes.string,
            srcSet: PropTypes.string,
            srcSetWebp: PropTypes.string,
          }),
          description: PropTypes.string,
        }),
      ]).isRequired,
      fromDate: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
      nsfw: PropTypes.bool.isRequired,
      content: PropTypes.objectOf(PropTypes.any).isRequired,
    }).isRequired,
  }).isRequired,
};
