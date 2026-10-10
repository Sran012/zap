import React from 'react';

export function PersonalLetter() {
  return (
    <section className="max-w-3xl mx-auto px-margin-lg pb-48 text-center md:text-left">
      <div className="space-y-12">
        <div className="h-px w-24 bg-white/20 mx-auto md:mx-0"></div>
        <h2 className="font-headline text-4xl font-bold text-white tracking-tight">Why I built Zap</h2>
        <div className="space-y-6 text-lg text-secondary font-light leading-relaxed">
          <p>
            The terminal is a superpower, but for many developers, it feels like a dark room where you&apos;re constantly fumbling for a light switch. I built Zap because I was tired of fighting my tools for basic tasks—like remembering where I put a file or what that one obscure Docker command was. 
          </p>
          <p>
            I wanted a tool that felt invisible but essential. Something that worked at the speed of thought. Zap is designed to make the terminal feel approachable, fast, and intellectually stimulating. It&apos;s for the high-performance dev who wants to stay in the flow, not in the manual.
          </p>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-6 pt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            className="w-14 h-14 rounded-full border border-white/20 p-1 object-cover grayscale brightness-125" 
            alt="Sujal Rana portrait" 
            src="https://lh3.googleusercontent.com/aida/ADBb0uiJ6bQEIZF37xl3HeLtX5GJlR3KK1BbYDi0cu0vB8-Wp7gyb9zCNNUVkEzAteptZqw0EQI5rNvomJtuPeHkBfwuCw52WgMkNumwHHe0rpI64Hk9yemZF_cPwEBQeDT8YhLgXvmMO7ybS2zTIH1fItBmp9OB4ljCTS6Ng98jtPiktNdiKG8QQUbbJSInQSSAdAeQo7TgSuG73UALfRI_QMOlyLxuW41Y7ifVSdkrGI2DrqZTWwcuw2DO9iVEY1gffVl_GACr5LXKIuc"
          />
          <div>
            <p className="font-semibold text-white">Sujal Rana</p>
            <p className="text-sm text-secondary">Software Engineer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
