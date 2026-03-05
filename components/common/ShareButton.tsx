"use client";

import { useState } from "react";

type Dict = {
  common: {
    buttons: {
      share: string;
      copied: string;
    };
  };
};

interface ShareButtonProps {
  dict: Dict;
}

export default function ShareButton({ dict }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { share, copied: copiedLabel } = dict.common.buttons;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        alert("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="slant-top-left bg-neutral py-1.5 pl-6 pr-4 font-secondary lg:text-lg active:bg-neutral-600 active:text-white"
      aria-label={share}
    >
      {copied ? copiedLabel : share}
    </button>
  );
}
