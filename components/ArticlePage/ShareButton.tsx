// components/articles/ShareButton.tsx
"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="slant-top-left bg-neutral py-1.5 pl-6 pr-4 font-secondary lg:text-lg"
      aria-label="Share article"
    >
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
