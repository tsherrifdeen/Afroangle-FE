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
  common: {
    buttons: {
      submit: string;
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
      className="mx-auto max-w-3xl space-y-5 bg-neutral font-secondary p-6 mt-10"
    >
      {/* Honeypot */}
      <input
        type="text"
        {...register("website")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <h3 className="text-xl text-primary-red">{comments.leaveComment}</h3>

      {/* Name */}
      <div className="space-y-1">
        <input
          {...register("name", { required: errors.required })}
          placeholder={forms.name}
          className="w-full resize-none rounded bg-white px-3 py-2
                 focus:outline-none focus:ring-1
                 focus:ring-primary-green"
        />
        {formErrors.name && (
          <p className="text-sm text-primary-red">{formErrors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <input
          {...register("email", {
            required: errors.required,
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: errors.invalidEmail,
            },
          })}
          placeholder={forms.email}
          className="w-full resize-none rounded bg-white px-3 py-2
                 focus:outline-none focus:ring-1
                 focus:ring-primary-green"
        />
        {formErrors.email && (
          <p className="text-sm text-primary-red">{formErrors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1">
        <textarea
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
          rows={3}
          className="w-full resize-none rounded bg-white px-3 py-2
                 focus:outline-none focus:ring-1
                 focus:ring-primary-green"
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
        className="w-full bg-primary-green px-4 py-2 font-secondary
                text-white transition
               hover:opacity-90
               disabled:cursor-not-allowed
               disabled:opacity-60"
      >
        {isSubmitting ? comments.sending : buttons.submit}
      </button>
    </form>
  );
}
