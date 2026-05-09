"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export function Button({ 
  className, 
  variant = 'default',
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "px-4 py-1.5 rounded-full text-sm font-medium transition-colors";
  let variantClasses = "";
  
  if (variant === 'default') {
    variantClasses = "bg-white text-black hover:bg-neutral-200";
  } else if (variant === 'outline') {
    variantClasses = "bg-white/5 border border-white/10 text-white hover:bg-white/10";
  } else if (variant === 'ghost') {
    variantClasses = "text-secondary hover:text-white bg-transparent";
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className || ""}`} {...props}>
      {children}
    </button>
  );
}
