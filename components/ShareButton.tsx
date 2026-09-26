"use client";

import { useEffect, useState } from "react";

export function ShareButton({ title, text, url }: { title: string; text: string; url: string }) {
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      setCanShare(true);
    }
  }, []);

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (e) {
        console.error("Error sharing", e);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error("Failed to copy", e);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-sm font-bold rounded-lg transition-colors border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? "已复制链接" : canShare ? "分享本文" : "复制链接分享"}
    </button>
  );
}
