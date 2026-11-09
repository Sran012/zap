import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

const SPECS: { label: string; value: ReactNode }[] = [
  {
    label: "Skipped by default",
    value: (
      <>
        <code className="font-mono text-[12.5px] text-fg">node_modules</code>,{" "}
        <code className="font-mono text-[12.5px] text-fg">dist</code>,{" "}
        <code className="font-mono text-[12.5px] text-fg">build</code>,{" "}
        <code className="font-mono text-[12.5px] text-fg">.next</code>,{" "}
        <code className="font-mono text-[12.5px] text-fg">.turbo</code>,{" "}
        <code className="font-mono text-[12.5px] text-fg">out</code>,{" "}
        <code className="font-mono text-[12.5px] text-fg">coverage</code>, and
        hidden folders.
      </>
    ),
  },
  {
    label: "History sources",
    value:
      "zsh, bash, fish, and PowerShell. It reads the history file for the shell you are currently in.",
  },
  {
    label: "Plain mode",
    value: (
      <>
        <code className="font-mono text-[12.5px] text-fg">
          zap pac --plain
        </code>{" "}
        prints the top match and skips the selector.
      </>
    ),
  },
  {
    label: "Runtime",
    value: "Node 18 or newer. No build step, no native dependencies.",
  },
  {
    label: "License",
    value: "MIT. Use it, fork it, ship it.",
  },
  {
    label: "Version",
    value: <span className="font-mono text-[12.5px] text-fg">1.1.0</span>,
  },
];

export function Notes() {
  return (
    <section
      id="notes"
      className="mx-auto max-w-6xl px-5 pb-28 sm:px-8 sm:pb-36"
    >
      <div className="border-t border-line pt-16 sm:pt-20">
        <Reveal>
          <h2 className="max-w-lg text-balance text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fg">
            Small tool. Few rules.
          </h2>
        </Reveal>

        <dl className="mt-10 grid gap-x-16 sm:grid-cols-2">
          {SPECS.map((spec) => (
            <div key={spec.label} className="border-t border-line py-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                {spec.label}
              </dt>
              <dd className="mt-2 text-[13.5px] leading-relaxed text-muted">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
