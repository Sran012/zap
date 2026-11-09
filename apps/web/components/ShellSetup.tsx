"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { Reveal } from "./Reveal";

type ShellId = "zsh" | "bash" | "fish" | "pwsh";

const SHELLS: {
  id: ShellId;
  label: string;
  lines: string[];
}[] = [
  {
    id: "zsh",
    label: "zsh",
    lines: ["zap init zsh >> ~/.zshrc", "source ~/.zshrc"],
  },
  {
    id: "bash",
    label: "bash",
    lines: ["zap init bash >> ~/.bashrc", "source ~/.bashrc"],
  },
  {
    id: "fish",
    label: "fish",
    lines: [
      "zap init fish >> ~/.config/fish/config.fish",
      "source ~/.config/fish/config.fish",
    ],
  },
  {
    id: "pwsh",
    label: "pwsh",
    lines: ["zap init powershell >> $PROFILE", ". $PROFILE"],
  },
];

function CodeLine({ line }: { line: string }) {
  const [first, ...rest] = line.split(" ");

  return (
    <div className="flex gap-4">
      <span className="select-none text-line">$</span>
      <span className="break-all text-fg">
        <span className="text-zap">{first}</span>
        {rest.length ? ` ${rest.join(" ")}` : ""}
      </span>
    </div>
  );
}

export function ShellSetup() {
  const [active, setActive] = useState<ShellId>("zsh");
  const reduce = useReducedMotion();

  const shell = SHELLS.find((item) => item.id === active) ?? SHELLS[0]!;
  const copyValue = shell.lines.join("\n");

  return (
    <section
      id="shell"
      className="mx-auto max-w-6xl px-5 pb-28 sm:px-8 sm:pb-36"
    >
      <div className="border-t border-line pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="text-balance text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fg">
                One line. Then it&rsquo;s yours.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
                <code className="font-mono text-[13.5px] text-fg">
                  zap init
                </code>{" "}
                writes a small wrapper for the shell you use. That wrapper is
                what lets zap change your working directory and hand commands
                back to your prompt.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div id="install" className="mt-9 scroll-mt-24">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel py-2.5 pl-4 pr-2">
                  <code className="truncate font-mono text-[12.5px] text-fg">
                    <span className="mr-2 text-faint">$</span>
                    npm install -g zap-search
                  </code>
                  <CopyButton
                    value="npm install -g zap-search"
                    label="Copy install command"
                  />
                </div>
                <p className="mt-3 font-mono text-[10.5px] text-faint">
                  Node 18 or newer.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-xl border border-line bg-panel">
              <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2.5">
                <div
                  role="tablist"
                  aria-label="Choose your shell"
                  className="flex items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.025] p-0.5"
                >
                  {SHELLS.map((item) => {
                    const selected = active === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActive(item.id)}
                        className={`relative rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                          selected ? "text-fg" : "text-faint hover:text-muted"
                        }`}
                      >
                        {selected && (
                          <motion.span
                            layoutId="shell-pill"
                            className="absolute inset-0 rounded-full bg-white/[0.08]"
                            transition={
                              reduce
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.35,
                                  }
                            }
                          />
                        )}
                        <span className="relative z-10">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <CopyButton
                  value={copyValue}
                  label={`Copy ${shell.label} setup`}
                />
              </div>

              <div className="px-4 py-5">
                <div className="space-y-2 font-mono text-[12.5px] leading-6">
                  {shell.lines.map((line) => (
                    <CodeLine key={line} line={line} />
                  ))}
                </div>
              </div>

              <div className="border-t border-line px-4 py-3 text-[11.5px] leading-relaxed text-faint">
                Then open a new shell, or source the file once. The wrapper is
                plain shell, so you can read it before you keep it.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
