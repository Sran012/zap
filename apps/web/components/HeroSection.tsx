"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install -g zap-search");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-container-max mx-auto px-margin-lg pt-48 pb-32 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in cursor-pointer">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <span className="text-xs font-medium text-secondary">Discover the all new Zap 1.1</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
      </div>
      
      <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
        One Terminal Helper For <br/>Doing it <span className="text-secondary/50 italic">All Together.</span>
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg text-secondary mb-12 font-light leading-relaxed">
        zap is a small terminal helper for when you know "it is somewhere here" but do not want to manually dig for it.
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
        <Button 
          onClick={() => window.open("https://www.npmjs.com/package/zap-search", "_blank")}
          className="px-8 py-3 w-full md:w-auto"
        >
          npm package
         </Button>
        <Button onClick={() => window.open("https://github.com/sran012/zap", "_blank")} variant="outline" className="px-8 py-3 w-full md:w-auto">view code</Button>
      </div>

      {/* Installation Snippet */}
      <div id="quick-install" className="max-w-3xl mx-auto glass-card rounded-2xl overflow-hidden premium-border group text-left">
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
          </div>
          <div className="text-[10px] font-mono text-secondary/30 tracking-widest uppercase">Quick Install</div>
        </div>
        <div className="p-8 font-mono text-sm flex items-center justify-between group-hover:bg-white/[0.01] transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-white/20 select-none">$</span>
            <span className="text-white">npm install -g zap-search</span>
          </div>
          <button onClick={handleCopy} className={`transition-colors cursor-pointer ${copied ? "text-green-400" : "text-secondary/50 hover:text-white"}`}>
            <span className="material-symbols-outlined text-xl">{copied ? "check" : "content_copy"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
