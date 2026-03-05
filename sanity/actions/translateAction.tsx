// sanity/actions/TranslateAction.ts
import { useState } from "react";
import { EarthGlobeIcon } from "@sanity/icons";
import { useToast } from "@sanity/ui";

export function TranslateAction(props: any) {
  const { id, draft, published } = props;
  const [isTranslating, setIsTranslating] = useState(false);
  const toast = useToast(); // Initialize the Sanity UI toast hook
  const doc = draft || published;

  // Only show this button on English documents
  if (doc?.language !== "en") {
    return null;
  }

  return {
    label: isTranslating
      ? "Translating to FR..."
      : "Translate to French (DeepL)",
    icon: EarthGlobeIcon,
    onHandle: async () => {
      setIsTranslating(true);

      // 1. Show a loading/info toast immediately
      toast.push({
        status: "info",
        title: "Translating document...",
        description: "Please wait while DeepL translates your content.",
      });

      try {
        // Point this to your Next.js API URL
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId: id, targetLang: "fr" }),
        });

        if (response.ok) {
          // 2. Show success toast
          toast.push({
            status: "success",
            title: "Translation successful!",
            description: "You can now switch to the French version.",
          });
        } else {
          // 3. Show API error toast
          const errorData = await response.json();
          toast.push({
            status: "error",
            title: "Translation failed",
            // Display the actual error message from the server
            description:
              errorData.error ||
              `Server responded with status ${response.status}`,
          });
        }
      } catch (err: any) {
        console.error(err);

        toast.push({
          status: "error",
          title: "Translation error",
          // Display the actual caught error message
          description: err.message || "An unexpected error occurred.",
        });
      } finally {
        setIsTranslating(false);
      }
    },
  };
}
