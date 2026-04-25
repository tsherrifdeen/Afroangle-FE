"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiLoader } from "react-icons/fi";

interface FooterSearchProps {
  dict: {
    buttons: {
      submit: string;
    };
    forms: {
      placeholders: {
        search: string;
      };
    };
  };
  locale: string;
}

export default function FooterSearch({ dict, locale }: FooterSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedQuery = searchQuery.trim();
    if (!sanitizedQuery || isPending) return;

    startTransition(() => {
      router.push(`/${locale}/search?q=${encodeURIComponent(sanitizedQuery)}`);
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex w-full items-center overflow-hidden rounded-xs border bg-white transition-all ${
        isPending
          ? "border-neutral-200 opacity-70"
          : "border-neutral-300 focus-within:border-primary-red focus-within:ring-1 focus-within:ring-primary-red"
      }`}
    >
      <label htmlFor="footer-search" className="sr-only">
        {dict.forms.placeholders.search}
      </label>

      <input
        id="footer-search"
        type="search"
        placeholder={dict.forms.placeholders.search}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={isPending}
        className="w-full bg-transparent pl-2.5 py-2 text-sm text-neutral-800 placeholder-neutral-400 font-secondary focus:outline-none disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={isPending || !searchQuery.trim()}
        aria-label={dict.buttons.submit}
        className="flex items-center justify-center bg-transparent text-xl pl-1 p-3 text-neutral-500 transition-colors hover:text-primary-red disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:text-neutral-300"
      >
        {isPending ? (
          <FiLoader className="h-5 w-5 animate-spin text-primary-red" />
        ) : (
          <FiSearch className="h-5 w-5" />
        )}
      </button>
    </form>
  );
}
