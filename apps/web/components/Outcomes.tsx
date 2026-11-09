"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { PlusIcon } from "./icons";
import { Reveal } from "./Reveal";

const OUTCOMES = [
  {
    id: "file",
    label: "Open a file",
    summary: "The match opens in your editor.",
    command: "zap readme",
    result: "› README.md",
    outcome: "opened README.md in $EDITOR",
    detail:
      "Uses $EDITOR when it is set. Otherwise it hands the file to your system opener.",
  },
  {
    id: "folder",
    label: "Change directory",
    summary: "Your shell actually moves.",
    command: "zap core",
    result: "› packages/core/",
    outcome: "cd packages/core",
    detail:
      "This is what the init wrapper is for. zap runs as a child process, so the wrapper carries the directory change back to the shell you are sitting in.",
  },
  {
    id: "history",
    label: "Run an old command",
    summary: "Pick it, it runs.",
    command: "zap %docker",
    result: "› docker compose up -d",
    outcome: "running docker compose up -d",
    detail:
      "Reads the history file for the shell you are in: zsh, bash, fish, or PowerShell.",
  },
  {
    id: "web",
    label: "Stage a snippet",
    summary: "Put it on your prompt, ready to edit.",
    command: "zap web tar",
    result: "› tar -xzf archive.tar.gz",
    outcome: "staged on your prompt line",
    detail:
      "For the flag you remember but cannot quite write. Edit it before you run it.",
  },
];

export function Outcomes() {
  const [open, setOpen] = useState<string | null>("folder");
  const reduce = useReducedMotion();

  return (
    <section
      id="modes"
      className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <h2 className="text-balance text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fg">
              Finding it is half the job.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              zap hands the result back to your shell, so the next thing
              actually happens. No preview pane. No copy-paste detour.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-line">
          {OUTCOMES.map((item, index) => {
            const expanded = open === item.id;
            return (
              <div key={item.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : item.id)}
                  aria-expanded={expanded}
                  className="group flex w-full items-start gap-5 py-6 text-left"
                >
                  <span className="tabular mt-1 font-mono text-[10px] text-faint">
                    0{index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="text-[17px] font-medium tracking-[-0.01em] text-fg">
                        {item.label}
                      </span>
                      <PlusIcon
                        className={`h-3.5 w-3.5 shrink-0 text-faint transition-transform duration-300 ${
                          expanded ? "rotate-45 text-muted" : ""
                        }`}
                      />
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed text-muted">
                      {item.summary}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: {
                          type: "spring",
                          bounce: 0,
                          duration: reduce ? 0 : 0.42,
                        },
                        opacity: { duration: reduce ? 0 : 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-9 sm:pl-10">
                        <div className="rounded-lg border border-line bg-panel px-4 py-3.5 font-mono text-[12px] leading-6">
                          <div className="break-words">
                            <span className="text-faint">$</span>{" "}
                            <span className="text-fg">{item.command}</span>
                          </div>
                          <div className="break-words text-muted">
                            {item.result}
                          </div>
                          <div className="break-words text-zap">
                            &rarr; {item.outcome}
                          </div>
                        </div>
                        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-faint">
                          {item.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
