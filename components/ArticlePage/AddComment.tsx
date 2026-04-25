"use client";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type CommentFormValues = {
  name: string;
  email: string;
  message: string;
  website?: string;
  language?: string;
};

type Dict = {
  common: {
    forms: {
      name: string;
      email: string;
      message: string;
    };
    buttons: {
      submit: string;
    };
    errors: {
      required: string;
      invalidEmail: string;
      submissionFailed: string;
    };
  };
  articles: {
    comments: {
      title: string;
      leaveComment: string;
      thankYou: string;
      sending: string;
      validation: {
        commentTooShort: string;
        commentTooLong: string;
      };
    };
  };
};

export default function CommentForm({
  postId,
  locale,
  dict,
}: {
  postId: string;
  locale: string;
  dict: Dict;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [startedAt] = useState<number>(() => Date.now());

  const router = useRouter();

  const { comments } = dict.articles;
  const { forms, errors, buttons } = dict.common;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<CommentFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
      language: locale,
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comment", {
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
        <p className="font-primary">{comments.thankYou}</p>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // Removed bg-neutral, added a top border to separate it from the comments
      className="mx-auto mt-10 pt-6 font-secondary w-full max-w-3xl space-y-5 border-t border-gray-300"
    >
      {/* Honeypot */}
      <input
        type="text"
        {...register("website")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      {/* Softened the heading color to match the comment section heading */}
      <h3 className="text-3xl font-primary font-semibold text-gray-800">
        {comments.leaveComment}
      </h3>

      {/* Name */}
      <div className="space-y-1">
        {/* Added explicit label for accessibility and UX */}
        <label htmlFor="name" className="sr-only">
          {forms.name}
        </label>
        <input
          id="name"
          {...register("name", { required: errors.required })}
          placeholder={forms.name}
          // Added borders, shadow, and smoother focus states
          className="w-full rounded-xs border border-gray-300 bg-white px-3 py-2  transition-colors focus:border-primary-green/50 focus:outline-none focus:ring-2 focus:ring-primary-green/50"
        />
        {formErrors.name && (
          <p className="text-sm text-primary-red">{formErrors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="sr-only">
          {forms.email}
        </label>
        <input
          id="email"
          {...register("email", {
            required: errors.required,
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: errors.invalidEmail,
            },
          })}
          placeholder={forms.email}
          className="w-full rounded-xs border border-gray-300 bg-white px-3 py-2  transition-colors focus:border-primary-green/50 focus:outline-none focus:ring-2 focus:ring-primary-green/50"
        />
        {formErrors.email && (
          <p className="text-sm text-primary-red">{formErrors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label htmlFor="message" className="sr-only">
          {forms.message}
        </label>
        <textarea
          id="message"
          {...register("message", {
            required: errors.required,
            minLength: {
              value: 5,
              message: comments.validation.commentTooShort,
            },
            maxLength: {
              value: 600,
              message: comments.validation.commentTooLong,
            },
          })}
          placeholder={forms.message}
          rows={4}
          className="w-full resize-y rounded-xs border border-gray-300 bg-white px-3 py-2  transition-colors focus:border-primary-green/50 focus:outline-none focus:ring-2 focus:ring-primary-green/50"
        />
        {formErrors.message && (
          <p className="text-sm text-primary-red">
            {formErrors.message.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={isSubmitting}
        className="mt-2 w-full rounded-xs bg-primary-green px-4 py-3 text-lg tracking-wider text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-60 font-primary"
      >
        {isSubmitting ? comments.sending : buttons.submit}
      </button>
    </form>
  );
}
