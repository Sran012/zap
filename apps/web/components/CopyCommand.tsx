"use client";

import { CheckIcon, CopyIcon } from "./icons";
import { useCopy } from "./CopyButton";

export function CopyCommand({ command }: { command: string }) {
  const { copied, copy } = useCopy(command);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${command}`}
      className="group inline-flex h-11 max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] pl-4 pr-1.5 font-mono text-[12.5px] text-fg transition-colors hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.99]"
    >
      <span className="text-faint">$</span>
      <span className="truncate">{command}</span>
      <span className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zap text-black">
        {copied ? (
          <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
        ) : (
          <CopyIcon className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
