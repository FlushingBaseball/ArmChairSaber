import { Link } from "react-router-dom";

export default function RecentArticles() {
  return (
    <div className="Wrapper-Recent-Posts">
      <h3 id="Recent-Articles-Header">Recent Articles</h3>
      <Link className="Preview-Article-Title" to={`/blog/Rich-Hill`}>
        {" "}
        Rich Hill
      </Link>
      {/* <Link className="Preview-Article-Title" to={`/blog/MLB-Expansion`}>
        {" "}
        MLB Expansion
      </Link> */}
    </div>
  );
}
