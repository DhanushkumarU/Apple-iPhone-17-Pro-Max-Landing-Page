import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const titleTextRef = useRef(null);
  const animFrameRef = useRef(null);

  // Interactive Cosmic Orange "Torch" Cursor Interaction
  useEffect(() => {
    const titleEl = titleTextRef.current;
    const wrapperEl = titleWrapperRef.current;
    if (!titleEl || !wrapperEl) return;

    // Check prefers-reduced-motion or touch devices
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) or (pointer: coarse)"
    ).matches;

    if (prefersReducedMotion || isTouch) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetOpacity = 0;
    let currentOpacity = 0;

    const handlePointerMove = (e) => {
      const rect = titleEl.getBoundingClientRect();
      // Calculate cursor position relative to the title element
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      // Expand detection zone slightly around the title
      const distanceX = Math.max(0, rect.left - e.clientX, e.clientX - rect.right);
      const distanceY = Math.max(0, rect.top - e.clientY, e.clientY - rect.bottom);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 240) {
        targetOpacity = Math.max(0, 1 - distance / 240);
      } else {
        targetOpacity = 0;
      }
    };

    const handlePointerLeave = () => {
      targetOpacity = 0;
    };

    // Smooth lerp loop via requestAnimationFrame
    const updateTorch = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      currentOpacity += (targetOpacity - currentOpacity) * 0.1;

      if (titleEl) {
        titleEl.style.setProperty("--torch-x", `${currentX.toFixed(1)}px`);
        titleEl.style.setProperty("--torch-y", `${currentY.toFixed(1)}px`);
        titleEl.style.setProperty(
          "--torch-opacity",
          currentOpacity < 0.005 ? "0" : currentOpacity.toFixed(3)
        );
      }

      animFrameRef.current = requestAnimationFrame(updateTorch);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    animFrameRef.current = requestAnimationFrame(updateTorch);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // GSAP Entrance & Scroll Transitions
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-title-wrapper", {
        y: 28,
        opacity: 0,
        duration: 1.0,
        delay: 0.1,
        ease: "power3.out",
      });

      gsap.from(".hero-actions", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".hero-cinema-stage", {
        scale: 0.94,
        y: 30,
        opacity: 0,
        duration: 1.1,
        delay: 0.65,
        ease: "power2.out",
      });

      gsap.from(".hero-specs-pill", {
        scale: 0.92,
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        delay: 0.9,
        ease: "power2.out",
      });

      gsap.from(".hero-scroll-hint", {
        opacity: 0,
        duration: 0.9,
        delay: 1.1,
        ease: "power2.out",
      });

      // Entrance animations complete
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      {/* Background Cinematic Video Layer - Sits directly behind hero title and content */}
      <div className="hero-video-backdrop" aria-hidden="true">
        <video
          className="hero-bg-video"
          src={process.env.PUBLIC_URL + "/teaser.mp4"}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Atmospheric vignette ensuring high text contrast while preserving video luminosity */}
        <div className="hero-video-vignette" />
      </div>

      <div className="hero-overlay" ref={contentRef}>

        {/* Interactive Hero Title with Cosmic Orange Torch Lighting */}
        <div className="hero-title-wrapper" ref={titleWrapperRef}>
          <h1
            className="hero-title"
            ref={titleTextRef}
            data-text="iPhone 17 Pro Max"
          >
            <span className="hero-title-base">iPhone 17 Pro Max</span>
            <span className="hero-title-torch" aria-hidden="true">
              iPhone 17 Pro Max
            </span>
          </h1>
        </div>

        {/* Secondary & primary action links */}
        <div className="hero-actions">
          <a href="#buy" className="hero-btn-primary">
            Buy from $1,199
          </a>
          <a href="#iphone17-3d" className="hero-link-secondary">
            Explore 3D Phone ↓
          </a>
        </div>

        {/* Cinematic Specification Rail */}
        <div className="hero-specs-rail" role="region" aria-label="Key Specifications">
          <div className="hero-rail-item">
            <span className="rail-value">6.9″</span>
            <span className="rail-label">display</span>
          </div>
          <div className="hero-rail-item">
            <span className="rail-value">A19 Pro</span>
            <span className="rail-label">Apple Silicon</span>
          </div>
          <div className="hero-rail-item">
            <span className="rail-value">48MP</span>
            <span className="rail-label">camera</span>
          </div>
          <div className="hero-rail-item">
            <span className="rail-value">37 hrs</span>
            <span className="rail-label">battery</span>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator - Positioned quietly at bottom edge of hero */}
      <a
        href="#iphone17-3d"
        className="hero-scroll-hint"
        aria-label="Scroll down to explore 3D product"
      >
        <span>Scroll to explore</span>
        <div className="scroll-chevron" />
      </a>
    </section>
  );
}
