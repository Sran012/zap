import { ArrowDown } from "./icons";
import { CopyCommand } from "./CopyCommand";
import { Reveal } from "./Reveal";
import { TerminalDemo } from "./TerminalDemo";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div aria-hidden="true" className="hero-glow" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal y={18}>
            <h1 className="text-balance text-[clamp(2.3rem,7vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg">
              It&rsquo;s in here somewhere.
              <br />
              <span className="text-zap">zap</span> finds it.
            </h1>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
              Fuzzy files and folders, your shell history, and the Docker flag
              you only half remember. One prompt, in the shell you already
              use.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CopyCommand command="npm install -g zap-search" />
              <a
                href="#modes"
                className="inline-flex h-11 items-center gap-1.5 rounded-full px-4 font-mono text-[12px] text-muted transition-colors hover:text-fg"
              >
                How it works
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18} y={22} amount={0.05} className="mt-12 sm:mt-16">
          <TerminalDemo />
        </Reveal>
      </div>
    </section>
  );
}
