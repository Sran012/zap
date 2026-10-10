"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";

// -- Entrance orchestration --
// Each element has a staggered delay so the hero "builds" top-to-bottom
// like a film title sequence, not popping in all at once.
const entrance = {
  badge: {
    initial: { opacity: 0, y: 20, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
  },
  heading: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  subtitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  cta: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  snippet: {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // -- Parallax transforms --
  // Different speeds per layer create depth illusion
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const snippetY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install -g zap-search");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={heroRef}
      className="max-w-container-max mx-auto px-margin-lg pt-48 pb-32 text-center"
    >
      {/* Badge — first thing that appears, with a blur-to-sharp entrance */}
      <motion.div
        {...entrance.badge}
        style={{ y: badgeY, opacity: heroOpacity, willChange: "transform" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 cursor-pointer interactive">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-medium text-secondary">
            Discover the all new Zap 1.1
          </span>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
        </div>
      </motion.div>

      {/* Main heading — the hero of the hero */}
      <motion.h1
        {...entrance.heading}
        style={{ y: headingY, willChange: "transform" }}
        className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
      >
        One Terminal Helper For <br />
        Doing it{" "}
        <span className="text-secondary/50 italic">All Together.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        {...entrance.subtitle}
        style={{ y: subtitleY, willChange: "transform" }}
        className="max-w-2xl mx-auto text-lg text-secondary mb-12 font-light leading-relaxed"
      >
        zap is a small terminal helper for when you know &quot;it is somewhere
        here&quot; but do not want to manually dig for it.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        {...entrance.cta}
        style={{ y: ctaY, willChange: "transform" }}
        className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20"
      >
        <Button
          onClick={() =>
            window.open("https://www.npmjs.com/package/zap-search", "_blank")
          }
          className="px-8 py-3 w-full md:w-auto"
        >
          npm package
        </Button>
        <Button
          onClick={() =>
            window.open("https://github.com/sran012/zap", "_blank")
          }
          variant="outline"
          className="px-8 py-3 w-full md:w-auto"
        >
          view code
        </Button>
      </motion.div>

      {/* Installation Snippet — last to appear, anchors the composition */}
      <motion.div
        {...entrance.snippet}
        style={{ y: snippetY, willChange: "transform" }}
        id="quick-install"
        className="max-w-3xl mx-auto glass-card rounded-2xl overflow-hidden premium-border group text-left"
      >
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
          </div>
          <div className="text-[10px] font-mono text-secondary/30 tracking-widest uppercase">
            Quick Install
          </div>
        </div>
        <div className="p-8 font-mono text-sm flex items-center justify-between group-hover:bg-white/[0.01] transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-white/20 select-none">$</span>
            <span className="text-white">npm install -g zap-search</span>
          </div>
          <button
            onClick={handleCopy}
            className={`transition-colors cursor-pointer ${copied ? "text-green-400" : "text-secondary/50 hover:text-white"}`}
          >
            <span className="material-symbols-outlined text-xl">
              {copied ? "check" : "content_copy"}
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
