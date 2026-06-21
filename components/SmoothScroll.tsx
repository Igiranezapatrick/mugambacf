"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const checkScrollBg = () => {
      const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      if (!element) return;
      
      const isDark = element.closest('.bg-espresso') || element.closest('.noise');
      if (isDark) {
        document.documentElement.classList.add('scrollbar-light');
      } else {
        document.documentElement.classList.remove('scrollbar-light');
      }
    };

    lenis.on('scroll', checkScrollBg);
    setTimeout(checkScrollBg, 100);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', checkScrollBg);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
