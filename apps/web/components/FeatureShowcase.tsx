import React from 'react';

export function FeatureShowcase() {
  return (
    <section className="max-w-4xl mx-auto px-margin-lg pb-48">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Deep Neural Search */}
        <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 hover:border-white/20 transition-all duration-500">
          <div className="flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white/90">search</span>
            </div>
            <div className="space-y-3">
              <h3 className="font-headline text-2xl font-bold text-white tracking-tight">Deep Search</h3>
              <p className="text-secondary leading-relaxed font-light">Fuzzy search files and folders from the current directory.</p>
            </div>
          </div>
        </div>

        {/* Instant Jump */}
        <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 hover:border-white/20 transition-all duration-500">
          <div className="flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white/90">bolt</span>
            </div>
            <div className="space-y-3">
              <h3 className="font-headline text-2xl font-bold text-white tracking-tight">Instant Jump</h3>
              <p className="text-secondary leading-relaxed font-light">Teleport across directories in milliseconds with intelligent path prediction and smart indexing.</p>
            </div>
          </div>
        </div>

        {/* Omni History */}
        <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 hover:border-white/20 transition-all duration-500">
          <div className="flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white/90">history</span>
            </div>
            <div className="space-y-3">
              <h3 className="font-headline text-2xl font-bold text-white tracking-tight">Omni History</h3>
              <p className="text-secondary leading-relaxed font-light">Search through every command you&apos;ve ever typed with lightning speed and advanced semantic filtering.</p>
            </div>
          </div>
        </div>

        {/* Community Snippets */}
        <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 hover:border-white/20 transition-all duration-500">
          <div className="flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white/90">auto_awesome</span>
            </div>
            <div className="space-y-3">
              <h3 className="font-headline text-2xl font-bold text-white tracking-tight">Web Snippets</h3>
              <p className="text-secondary leading-relaxed font-light">Search standard commands for Docker, Kubectl, Git, and more.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
