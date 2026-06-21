"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current.querySelectorAll(".hero-text-zoom"), {
      scale: 3,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.15
    });
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
