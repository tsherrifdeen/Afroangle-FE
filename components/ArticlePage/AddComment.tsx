"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type CommentFormValues = {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot
};

export default function CommentForm({ postId }: { postId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [startedAt] = useState<number>(() => Date.now());

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sanity/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          _id: postId,
          startedAt,
        }),
      });

      if (!res.ok) {
        // Optional: you can surface a message to the user here
        setIsSubmitting(false);
        return;
      }
      reset();
      router.refresh();
      setHasSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubmitted)
    return (
      <div className="max-w-3xl mx-auto my-6">
        <p className="font-primary">Thanks for your comment!</p>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-5 bg-neutral p-6 mt-10"
    >
      {/* Honeypot */}
      <input
        type="text"
        {...register("website")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <h3 className="text-2xl text-primary-red">Leave a comment</h3>

      {/* Name */}
      <div className="space-y-1">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="w-full resize-none rounded bg-white px-3 py-2
                 focus:outline-none focus:ring-1
                 focus:ring-primary-green"
        />
        {errors.name && (
          <p className="text-sm text-primary-red">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address",
            },
          })}
          placeholder="Email"
          className="w-full resize-none rounded bg-white px-3 py-2
                 focus:outline-none focus:ring-1
                 focus:ring-primary-green"
        />
        {errors.email && (
          <p className="text-sm text-primary-red">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1">
        <textarea
          {...register("message", {
            required: "Comment is required",
            minLength: { value: 5, message: "Comment is too short" },
            maxLength: { value: 1000, message: "Comment is too long" },
          })}
          placeholder="Comment…"
          rows={3}
          className="w-full resize-none rounded bg-white px-3 py-2
                 focus:outline-none focus:ring-1
                 focus:ring-primary-green"
        />
        {errors.message && (
          <p className="text-sm text-primary-red">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={isSubmitting}
        className="w-full bg-primary-green px-4 py-2 font-secondary
                text-white transition
               hover:opacity-90
               disabled:cursor-not-allowed
               disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Submit Comment"}
      </button>
    </form>
  );
}
