"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import { Bolt, GithubIcon } from "./icons";

const LINKS = [
  { href: "#modes", label: "Modes" },
  { href: "#shell", label: "Shell" },
  { href: "#notes", label: "Notes" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-zap/70"
      />

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-colors duration-300 ${
            scrolled
              ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Primary"
            className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8"
          >
            <a
              href="#top"
              className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.03em] text-fg"
              aria-label="zap, back to top"
            >
              <Bolt className="h-4 w-4 text-zap" />
              <span>zap</span>
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href="https://github.com/Sran012/zap"
                target="_blank"
                rel="noreferrer"
                aria-label="zap on GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="#install"
                className="inline-flex h-8 items-center rounded-full bg-zap px-3.5 text-[12.5px] font-medium text-black transition-colors hover:bg-[#2bff72] active:scale-[0.97]"
              >
                Install
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
