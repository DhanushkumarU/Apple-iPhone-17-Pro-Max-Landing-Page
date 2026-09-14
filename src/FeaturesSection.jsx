import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FeaturesSection.css";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  {
    tag: "Design",
    title: "Precision Aluminium Unibody",
    desc: "Forged from high-strength aerospace-grade aluminium with contoured edges and Ceramic Shield 2 front.",
    stat: "100%",
    statLabel: "Recycled aluminium unibody enclosure",
  },
  {
    tag: "Silicon",
    title: "A19 Pro Breakthrough",
    desc: "Fastest smartphone chip with 6-core GPU, hardware-accelerated ray tracing, and Apple Intelligence.",
    stat: "35 TOPS",
    statLabel: "Neural Engine processing speed",
  },
  {
    tag: "Pro Camera",
    title: "48MP Pro Fusion Camera System",
    desc: "Triple 48MP rear cameras with 8x optical-quality reach, 4K 120 fps Dolby Vision, and 18MP Center Stage front camera.",
    stat: "48MP",
    statLabel: "Pro Fusion & 18MP Center Stage",
  },
  {
    tag: "Battery Life",
    title: "Unrivaled All-Day Power",
    desc: "Longest battery life in any iPhone ever, supporting up to 37 hours of video playback with MagSafe charging.",
    stat: "37 hrs",
    statLabel: "Video playback",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".features-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".highlight-card", {
        scrollTrigger: {
          trigger: ".highlights-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="features-section" ref={sectionRef}>
      <div className="features-container">
        <div className="features-header">
          <span className="features-eyebrow">Flagship Innovations</span>
          <h2 className="features-headline">Engineered beyond limits.</h2>
          <p className="features-subhead">
            Every component of iPhone 17 Pro Max was designed with relentless attention to detail and factual performance.
          </p>
        </div>

        <div className="highlights-grid">
          {HIGHLIGHTS.map((item, index) => (
            <div className="highlight-card" key={index}>
              <div className="card-tag">{item.tag}</div>
              <div className="card-stat">{item.stat}</div>
              <div className="card-stat-label">{item.statLabel}</div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
