// 3. Small helper for repeated metadata (Author/Date)
const ArticleMeta = ({ author, date }) => (
  <div className="flex gap-3 text-sm font-medium">
    <span>{author}</span>
    <time>{date}</time>
  </div>
);
export default ArticleMeta;
