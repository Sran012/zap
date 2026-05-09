"use client";

import React, { useState } from 'react';

type ShellType = 'zsh' | 'bash' | 'fish' | 'powershell';

const shellConfigs: Record<ShellType, { c1Action: string; c1Args: string; c2Action: string; c2Args: string; label: string }> = {
  zsh: {
    label: "ZSH",
    c1Action: "zap", c1Args: "init zsh >> ~/.zshrc",
    c2Action: "source", c2Args: "~/.zshrc"
  },
  bash: {
    label: "BASH",
    c1Action: "zap", c1Args: "init bash >> ~/.bashrc",
    c2Action: "source", c2Args: "~/.bashrc"
  },
  fish: {
    label: "FISH",
    c1Action: "zap", c1Args: "init fish >> ~/.config/fish/config.fish",
    c2Action: "source", c2Args: "~/.config/fish/config.fish"
  },
  powershell: {
    label: "PWSH",
    c1Action: "zap", c1Args: "init powershell >> $PROFILE",
    c2Action: ".", c2Args: " $PROFILE"
  }
};

export function InitSnippet() {
  const [activeShell, setActiveShell] = useState<ShellType>('zsh');
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const handleCopy1 = () => {
    const config = shellConfigs[activeShell];
    navigator.clipboard.writeText(`${config.c1Action} ${config.c1Args}`);
    setCopied1(true);
    setTimeout(() => setCopied1(false), 2000);
  };

  const handleCopy2 = () => {
    const config = shellConfigs[activeShell];
    navigator.clipboard.writeText(`${config.c2Action} ${config.c2Args}`);
    setCopied2(true);
    setTimeout(() => setCopied2(false), 2000);
  };

  return (
    <section className="max-w-container-max mx-auto px-margin-lg pb-32">
      <div className="border-t border-white/5 pt-24">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <h2 className="font-headline text-3xl font-bold text-white mb-4">Zero-config <br/>initialization</h2>
            <p className="text-secondary leading-relaxed">
              Add Zap to your environment with a single pipe. Supported by all major modern shells.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {(Object.keys(shellConfigs) as ShellType[]).map((shell) => {
                const isActive = activeShell === shell;
                return (
                  <button
                    key={shell}
                    onClick={() => setActiveShell(shell)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                      isActive 
                        ? "bg-white text-black" 
                        : "bg-white/5 border border-white/10 text-secondary hover:bg-white/10"
                    }`}
                  >
                    {shellConfigs[shell].label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="lg:w-2/3 w-full bg-surface/50 rounded-2xl p-1 border border-white/10">
            <div className="bg-black rounded-xl p-8 space-y-8 font-mono text-sm overflow-x-auto">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-secondary/30 text-xs"># Step 1: Initialize environment</span>
                  <span 
                    onClick={handleCopy1} 
                    className={`material-symbols-outlined text-sm cursor-pointer transition-colors ${copied1 ? "text-green-400" : "text-secondary/30 hover:text-white"}`}
                  >
                    {copied1 ? "check" : "content_copy"}
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white/20 select-none">1</span>
                  <span>
                    <span className="text-[#89ddff]">{shellConfigs[activeShell].c1Action}</span>{' '}
                    <span className="text-white">{shellConfigs[activeShell].c1Args}</span>
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-secondary/30 text-xs"># Step 2: Reload shell config</span>
                  <span 
                    onClick={handleCopy2} 
                    className={`material-symbols-outlined text-sm cursor-pointer transition-colors ${copied2 ? "text-green-400" : "text-secondary/30 hover:text-white"}`}
                  >
                    {copied2 ? "check" : "content_copy"}
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white/20 select-none">2</span>
                  <span>
                    <span className="text-[#89ddff]">{shellConfigs[activeShell].c2Action}</span>{' '}
                    <span className="text-white">{shellConfigs[activeShell].c2Args}</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
