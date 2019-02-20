import React from "react";
import { StaticQuery, graphql } from "gatsby";

const Title = ({ data: { title, description } }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "avenir"
    }}
  >
    <h2 style={{ marginBottom: 0 }}>{title}</h2>
    <p
      style={{
        marginTop: 0,
        opacity: 0.5
      }}
    >
      {description}
    </p>
  </div>
);

const Header = () => (
  <StaticQuery
    query={GetTitle}
    render={data => <Title data={data.site.siteMetadata} />}
  />
);

export default Header;

const GetTitle = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
