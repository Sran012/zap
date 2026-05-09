"use client";

import React from 'react';
import { Button } from './ui/button';

export function NavBar() {
  const scrollToInstall = () => {
    document.getElementById('quick-install')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 nav-blur border-b border-white/5 h-16 flex items-center">
      <div className="max-w-container-max mx-auto w-full px-margin-lg flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="font-headline text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-sm"></div>
            </div>
            Zap
          </div>
          
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={scrollToInstall} variant="default">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
