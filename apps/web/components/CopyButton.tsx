"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

export function useCopy(value: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [value]);

  return { copied, copy };
}

type CopyButtonProps = {
  value: string;
  label: string;
  className?: string;
};

export function CopyButton({ value, label, className = "" }: CopyButtonProps) {
  const { copied, copy } = useCopy(value);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={`group inline-flex h-7 w-7 items-center justify-center rounded-md text-faint transition-colors hover:bg-white/[0.06] hover:text-fg active:scale-95 ${className}`}
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 text-zap" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
