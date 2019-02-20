import React from "react";
import { Link } from "gatsby";

const SingleTagsTemplate = ({ pageContext: { posts } }) => {
  return (
    <div>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleTagsTemplate;
