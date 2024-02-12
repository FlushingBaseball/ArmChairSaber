// import { useState } from "react";

import RecentArticles from "./RecentArticles";

import RichHill from "./Articles/RichHill.mdx";

export default function BlogHome() {
  return (
    <div className="WrapperBlogHome">
      <RecentArticles />
        <RichHill />
    </div>
  );
}
