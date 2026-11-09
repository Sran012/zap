import { Bolt, GithubIcon, XIcon } from "./icons";

const LINKS = [
  {
    href: "https://www.npmjs.com/package/zap-search",
    label: "npm",
  },
  {
    href: "https://github.com/Sran012/zap",
    label: "GitHub",
  },
  {
    href: "https://x.com/twtsujal",
    label: "X",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#top"
            className="flex items-center gap-2 text-[14px] font-semibold tracking-[-0.02em] text-fg"
          >
            <Bolt className="h-3.5 w-3.5 text-zap" />
            zap
            <span className="font-normal text-faint">/ terminal helper</span>
          </a>

          <nav
            aria-label="Elsewhere"
            className="flex items-center gap-6 font-mono text-[11px] text-muted"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
              >
                {link.label === "GitHub" && (
                  <GithubIcon className="h-3 w-3" />
                )}
                {link.label === "X" && <XIcon className="h-3 w-3" />}
                {link.label}
              </a>
            ))}
          </nav>

          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            MIT / v1.1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
