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
    <div className="mx-auto mt-8 w-full max-w-3xl space-y-6">
      {/* Always show the section title */}
      <h5 className="text-2xl uppercase leading-none text-primary-red">
        {c.title}
      </h5>

      {/* Safely check if the array is empty */}
      {comments.length === 0 ? (
        <p className="text-center font-secondary text-gray-500">
          {c.noComments}
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="w-full space-y-2 bg-neutral px-6 py-3 lg:space-y-2.5 lg:px-10 lg:py-8"
            >
              <div className="flex items-center gap-2">
                <h6 className="font-medium capitalize lg:text-xl">
                  {comment.name}
                </h6>
                <p className="text-black/60">{timeAgo(comment._createdAt)}</p>
              </div>
              <p>{comment.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
