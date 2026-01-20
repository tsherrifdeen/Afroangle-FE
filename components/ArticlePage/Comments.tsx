import { getArticleComments } from "@/sanity/services/commentService";
import { timeAgo } from "@/utils/DateConversion";

interface CommentsProps {
  id: string;
}
const Comments = async ({ id }: CommentsProps) => {
  const comments = (await getArticleComments(id)).data;
  return (
    <div className="max-w-3xl mt-8 w-full mx-auto space-y-8">
      <h5 className="uppercase text-2xl text-primary-red leading-none">
        Comments
      </h5>
      {comments.length == 0 ? (
        <p className="text-sm text-center">No comment on this article</p>
      ) : (
        comments.map((comment, index) => (
          <div
            key={index}
            className="bg-neutral lg:px-10 space-y-2 lg:space-y-2.5 lg:py-8 px-6 py-3"
          >
            <div className="flex gap-2 items-center">
              <h6 className="lg:text-xl capitalize font-medium">
                {comment.name}
              </h6>
              <p className="text-black/60">{timeAgo(comment._createdAt)}</p>
            </div>
            <p className="">{comment.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
