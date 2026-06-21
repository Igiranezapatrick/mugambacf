"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current.querySelectorAll(".hero-text-zoom"), {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.15
    });
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
