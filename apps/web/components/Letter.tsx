import { Reveal } from "./Reveal";

export function Letter() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-8 sm:pb-36">
      <div className="border-t border-line pt-16 sm:pt-20">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-balance text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg">
              I built the tool I wanted when I started.
            </h2>
            <div className="mt-6 space-y-4 text-[14.5px] leading-7 text-muted">
              <p>
                When I was new to programming, the terminal felt harder than it
                should. Finding a file, jumping into a folder, remembering a
                command I knew I had seen before. Small things that broke my
                flow.
              </p>
              <p>
                zap is the tool I wanted then. Simple enough to stay out of the
                way, fast enough to keep up. If it helps you, it did its job.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="h-px w-8 bg-zap" />
              <span className="text-[13px] text-fg">Sujal Rana</span>
              <a
                href="https://x.com/twtsujal"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] text-faint transition-colors hover:text-muted"
              >
                @twtsujal
              </a>
              <a
                href="https://github.com/sran012"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] text-faint transition-colors hover:text-muted"
              >
                sran012
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
