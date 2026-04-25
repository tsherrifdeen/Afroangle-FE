import { getArticleComments } from "@/sanity/services/commentService";
import { timeAgo } from "@/utils/DateConversion";

type Dict = {
  articles: {
    comments: {
      title: string;
      noComments: string;
    };
  };
};

interface CommentsProps {
  articleId: string;
  dict: Dict;
}

const Comments = async ({ articleId, dict }: CommentsProps) => {
  const response = await getArticleComments(articleId);
  const comments = response?.data || [];
  const { comments: c } = dict.articles;

  return (
    <div className="mx-auto mt-12 w-full max-w-3xl space-y-8">
      {/* Removed uppercase, made it title-case and softened the color */}
      <h5 className="text-3xl font-semibold capitalize text-gray-800">
        {c.title}
      </h5>

      {comments.length === 0 ? (
        <p className="text-center text-gray-500 font-secondary">
          {c.noComments}
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              // Removed bg-neutral. Replaced with a clean bottom border
              className="w-full space-y-3 border-b border-gray-300 pb-6 last:border-b-0"
            >
              <div className="flex items-baseline gap-3">
                <h6 className="font-semibold capitalize text-gray-900 lg:text-lg">
                  {comment.name}
                </h6>
                <p className="text-sm text-gray-500">
                  {timeAgo(comment._createdAt)}
                </p>
              </div>

              {/* Added leading-relaxed for better readability */}
              <p className="font-secondary leading-relaxed text-gray-700">
                {comment.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
