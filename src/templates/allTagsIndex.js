import React from "react";
import { Link } from "gatsby";
const AllTagsTemplate = ({ pageContext: { tags } }) => {
  return (
    <div>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <Link to={`/tags/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTagsTemplate;
