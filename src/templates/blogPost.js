import React from "react";
import { graphql, Link } from "gatsby";

const Template = ({
  data: { markdownRemark },
  pageContext: { prev, next }
}) => {
  return (
    <div>
      <h3>{markdownRemark.frontmatter.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      {prev && (
        <div>
          <Link to={prev.frontmatter.path}>Previous post</Link>
        </div>
      )}
      {next && (
        <div>
          <Link to={next.frontmatter.path}>Next post</Link>
        </div>
      )}
    </div>
  );
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Template;
