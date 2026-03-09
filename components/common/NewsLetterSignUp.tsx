"use client";
import { useState } from "react";
import Image from "next/image";
import { CloseIcon } from "@sanity/icons";
import { useForm, SubmitHandler } from "react-hook-form";

type NewsletterModalProps = {
  trigger?: React.ReactNode;
  dict: {
    common: {
      buttons: {
        subscribe: string;
        close: string;
      };
      forms: {
        name: string;
        email: string;
        placeholders: {
          name: string;
          email: string;
        };
      };
      errors: {
        required: string;
        invalidEmail: string;
        submissionFailed: string;
      };
    };
    newsletter: {
      modal: {
        freeBadge: string;
        title: string;
        description: string;
        success: {
          title: string;
          description: string;
        };
      };
    };
  };
};

type FormValues = {
  fullName: string;
  email: string;
};

export default function NewsletterModal({
  trigger,
  dict,
}: NewsletterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const { common, newsletter } = dict;
  const { modal } = newsletter;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStatus("idle");
      reset();
    }, 300);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, fullName: data.fullName }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        throw new Error(result.error || common.errors.submissionFailed);
      }
    } catch (error: any) {
      setStatus("idle");
      alert(error.message || common.errors.submissionFailed);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div onClick={handleOpen} className="inline-block cursor-pointer">
        {trigger || (
          <button className="bg-primary-green py-4 pl-8 pr-6 text-white slant-top-left leading-none">
            {common.buttons.subscribe}
          </button>
        )}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-136 relative shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center pb-12 pt-14 px-8 md:px-18">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 text-secondary right-6 flex items-center gap-2 text-sm font-light tracking-widest text-black hover:opacity-70 transition-opacity"
            >
              {common.buttons.close}
              <CloseIcon className="text-[#d32f2f]" fontSize={22} />
            </button>

            {/* STATE 1: SUCCESS VIEW */}
            {status === "success" ? (
              <div className="w-full flex flex-col items-center fade-in duration-300">
                <h2 className="font-bold font-primary text-xl md:text-2xl uppercase tracking-widest mb-8 text-black">
                  {modal.success.title}
                </h2>

                <Image
                  src="/digest_success.svg"
                  alt="Success"
                  width={250}
                  height={250}
                  className="mb-8 w-full"
                />

                <p className="font-secondary font-light text-black mb-8 max-w-sm leading-relaxed">
                  {modal.success.description}
                </p>

                <button
                  onClick={handleClose}
                  className="w-40 bg-primary-green text-white py-4 px-6 flex items-center justify-center gap-3 hover:bg-[#0a3a24] transition-colors group"
                >
                  <span className="font-primary font-light text-lg tracking-wider">
                    {common.buttons.close}
                  </span>
                  <CloseIcon className="text-[#FF9696]" fontSize={22} />
                </button>
              </div>
            ) : (
              /* STATE 2: SIGNUP FORM VIEW */
              <div className="w-full flex flex-col items-center">
                <h2
                  className="font-bold text-xl md:text-2xl text-black font-primary uppercase tracking-widest mb-8 leading-tight"
                  dangerouslySetInnerHTML={{ __html: modal.title }}
                />

                <Image
                  src="/digest_form.svg"
                  alt="Newsletter Digest"
                  width={120}
                  height={120}
                  className="mb-8 w-full"
                />

                <p className="font-secondary font-light text-black mb-8 max-w-sm text-sm">
                  {modal.description}
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  {/* NAME INPUT */}
                  <div className="w-full text-left">
                    <input
                      type="text"
                      placeholder={common.forms.placeholders.name}
                      disabled={status === "loading"}
                      {...register("fullName", {
                        required: common.errors.required,
                      })}
                      className={`w-full bg-[#f4f4f4] border ${
                        errors.fullName ? "border-red-500" : "border-[#e5aeae]"
                      } text-gray-800 p-4 outline-none text-secondary focus:border-[#d32f2f] focus:ring-1 focus:ring-[#d32f2f] transition-all placeholder:text-gray-400`}
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-xs mt-1 block pl-1">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  {/* EMAIL INPUT */}
                  <div className="w-full text-left">
                    <input
                      type="email"
                      placeholder={common.forms.placeholders.email}
                      disabled={status === "loading"}
                      {...register("email", {
                        required: common.errors.required,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: common.errors.invalidEmail,
                        },
                      })}
                      className={`w-full bg-[#f4f4f4] border ${
                        errors.email ? "border-red-500" : "border-[#e5aeae]"
                      } text-gray-800 p-4 outline-none focus:border-[#d32f2f] text-secondary focus:ring-1 focus:ring-[#d32f2f] transition-all placeholder:text-gray-400`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs mt-1 block pl-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-primary-green text-white py-4 px-6 mt-4 flex items-center justify-between hover:bg-[#0a3a24] transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    <span className="font-primary text-lg tracking-wide">
                      {status === "loading" ? "..." : common.buttons.subscribe}
                    </span>
                    <span className="font-secondary text-xs tracking-widest text-[#a5d6a7] group-hover:text-white transition-colors uppercase">
                      {modal.freeBadge}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
