import React from "react";
import { graphql, Link } from "gatsby";

import Header from "../components/Header";

const Layout = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "avenir"
        }}
      >
        {edges.map(({ node: { frontmatter } }, key) => {
          return (
            <Link
              to={frontmatter.path}
              key={key}
              style={{ marginBottom: "1rem" }}
            >
              {frontmatter.title}
            </Link>
          );
        })}
      </div>
      <div>
        <Link tyle={{ marginBottom: "1rem" }} to="/tags">
          Go to all tags
        </Link>
      </div>
    </div>
  );
};

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`;

export default Layout;
