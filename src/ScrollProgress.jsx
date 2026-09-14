import React, { useState, useEffect } from "react";
import "./ScrollProgress.css";

function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      const el = document.scrollingElement || document.documentElement || document.body;
      const scrollTotal = el.scrollHeight - el.clientHeight;
      if (scrollTotal <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = el.scrollTop || window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(100, Math.max(0, (currentScroll / scrollTotal) * 100));
      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    // Calculate immediately on mount
    calculateProgress();

    // Recalculate after initial render to account for lazy-loaded assets
    const timer1 = setTimeout(calculateProgress, 400);
    const timer2 = setTimeout(calculateProgress, 1200);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="scroll-progress-fixed-host" aria-hidden="true">
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

export default ScrollProgress;
