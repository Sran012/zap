"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Don't render on mobile or if reduced motion preferred
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], .interactive")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], .interactive")
      ) {
        setIsHovering(false);
      }
    };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 16}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot cursor — default state */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "white",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "opacity 0.3s, width 0.3s, height 0.3s",
          opacity: isHovering ? 0 : 1,
        }}
      />
      {/* Ring cursor — hover state */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid white",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "opacity 0.3s, transform 0.3s",
          opacity: isHovering ? 1 : 0,
        }}
      />
    </>
  );
}
