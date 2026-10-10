"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.5 });

  return (
    <motion.footer
      ref={footerRef}
      className="border-t border-white/5 py-12 px-margin-lg"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-headline font-bold text-lg tracking-tighter flex items-center gap-2">
          <div className="w-5 h-5 bg-white/20 rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
          </div>
          Zap
        </div>
        <div className="flex items-center gap-12">
          <button
            className="text-xs font-mono text-secondary/50 hover:text-white transition-colors"
            onClick={() =>
              window.open("https://github.com/sran012/zap", "_blank")
            }
          >
            GitHub
          </button>
          <button
            className="text-xs font-mono text-secondary/50 hover:text-white transition-colors"
            onClick={() =>
              window.open(
                "https://www.npmjs.com/package/zap-search",
                "_blank"
              )
            }
          >
            Npm
          </button>
        </div>
        <div className="text-[10px] font-mono text-secondary/30 uppercase tracking-[0.2em]">
          Zap — terminal tool
        </div>
      </div>
    </motion.footer>
  );
}
