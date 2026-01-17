"use client";

import { useState } from "react";
import { useForm } from "react-hook-form"; // Optional: use whatever form lib you like

export default function CommentForm({ postId }: { postId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ ...data, _id: postId }),
    });

    setIsSubmitting(false);
    setHasSubmitted(true);
  };

  if (hasSubmitted)
    return <p>Thanks for your comment! It will appear once approved.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input {...register("name")} placeholder="Name" className="border p-2" />
      <input
        {...register("email")}
        placeholder="Email"
        className="border p-2"
      />
      <textarea
        {...register("message")}
        placeholder="Comment"
        className="border p-2"
      />
      <button disabled={isSubmitting} className="bg-blue-500 text-white p-2">
        {isSubmitting ? "Sending..." : "Submit Comment"}
      </button>
    </form>
  );
}
