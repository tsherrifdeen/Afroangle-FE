import { getArticleComments } from "@/sanity/services/commentService";

interface CommentsProps {
  id: string;
}
const Comments = async ({ id }: CommentsProps) => {
  const comments = (await getArticleComments(id)).data;
  // if (comments.length == 0) {
  //   return (
  //     <p className="text-neutral text-sm text-center">
  //       No comment on this article
  //     </p>
  //   );
  // }
  return (
    <div className="max-w-3xl w-full mx-auto space-y-9">
      <h5 className="uppercase text-2xl text-primary-red">Comments</h5>
      {comments.map((comment, index) => (
        <div key={index} className="bg-neutral px-10 space-y-2.5 py-8">
          <h6 className="text-2xl font-medium">{comment.name}</h6>
          <p className="text-xl">{comment.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
