"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function SlideFromLeft({ children }: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.from(el.querySelectorAll(".text"), {
            x: -200,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={elementRef}>{children}</div>;
}
