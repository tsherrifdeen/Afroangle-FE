"use client";

import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for monitoring
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] w-full flex-col font-secondary items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <FiAlertTriangle className="h-16 w-16 text-red-500" />
        </div>

        {/* Error Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-800 lg:text-4xl">
            Something went wrong
          </h1>
          <p className="text-neutral-600">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-4 rounded-md bg-red-50 p-4 text-left">
            <p className="text-sm font-mono text-red-800">{error.message}</p>
          </div>
        )}

        {/* Retry Button */}
        <div className="pt-6">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center bg-primary-green px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
