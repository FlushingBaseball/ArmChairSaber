import { useState } from "react";
import { Link } from "react-router-dom";


import RichHill from "./Articles/RichHill.mdx";

export default function BlogHome() {
  return (
    <div className="WrapperBlogHome">
      

      <div className="Wrapper-Recent-Posts">
        <h3 id="Recent-Articles-Header">Recent Articles</h3>
        <Link className="Preview-Article-Title" to={`/blog/Rich-Hill`}>
          {" "}
          Rich Hill
        </Link>
        <Link className="Preview-Article-Title" to={`/blog/MLB-Expansion`}>
          {" "}
          MLB Expansion
        </Link>
      </div>



 
      <RichHill />

      {/* <ArticleOne /> */}
    </div>
  );
}
