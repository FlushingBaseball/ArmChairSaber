import { useState, useEffect } from "react";
import {articles} from "../Metadata/article-metadata.json"

/**
 * Import the Metadata file for all the articles, map out previews from newest to oldest
 * 
 */

// import RecentArticles from "./RecentArticles";

// import RichHill from "./Articles/RichHill.mdx";

// export default function BlogHome() {
//   return (
//     <div className="WrapperBlogHome">
//       <div className="blog-header">

//       </div>
//       <div className="blog-home">

//       </div>
//     </div>
//   );
// }
// import { useState } from "react";

import RecentArticles from "./RecentArticles";

import RichHill from "./Articles/RichHill.mdx";

export default function BlogHome() {
  return (
    <div className="WrapperBlogHome">
        <RichHill />
    </div>
  );
}