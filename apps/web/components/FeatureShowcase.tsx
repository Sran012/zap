"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: "search",
    title: "Deep Search",
    description: "Fuzzy search files and folders from the current directory.",
  },
  {
    icon: "bolt",
    title: "Instant Jump",
    description:
      "Teleport across directories in milliseconds with intelligent path prediction and smart indexing.",
  },
  {
    icon: "history",
    title: "Omni History",
    description:
      "Search through every command you\u2019ve ever typed with lightning speed and advanced semantic filtering.",
  },
  {
    icon: "auto_awesome",
    title: "Web Snippets",
    description:
      "Search standard commands for Docker, Kubectl, Git, and more.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function FeatureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="max-w-4xl mx-auto px-margin-lg pb-48">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={cardVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.04)",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="interactive group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 cursor-pointer"
            style={{ willChange: "transform" }}
          >
            <div className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-500">
                <span className="material-symbols-outlined text-white/90">
                  {feature.icon}
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="font-headline text-2xl font-bold text-white tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-secondary leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
