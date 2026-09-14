import React, { useState, useEffect, useRef } from "react";
import "./AutoScroller.css";

const HIGHLIGHT_SLIDES = [
  {
    img: process.env.PUBLIC_URL + "/Images/p1.jpg",
    title: "Precision Aluminium Unibody",
    category: "Design",
    desc: "Precision-machined unibody enclosure in five distinctive finishes, led by iconic Cosmic Orange.",
    alt: "iPhone 17 Pro Max in precision aluminium unibody finishes",
  },
  {
    img: process.env.PUBLIC_URL + "/Images/file7.jpg",
    title: "8x Optical-Quality Zoom",
    category: "Optics",
    desc: "Tetraprism optical subsystem delivering 200 mm focal reach with 3D sensor-shift OIS.",
    alt: "8x optical-quality zoom with tetraprism lens subsystem",
  },
  {
    img: process.env.PUBLIC_URL + "/Images/file2.jpg",
    title: "A19 Pro Breakthrough Silicon",
    category: "Compute",
    desc: "Next-gen 3nm architecture with 6-core GPU, hardware ray tracing, and Neural Accelerators.",
    alt: "A19 Pro 3nm Silicon architecture",
  },
  {
    img: process.env.PUBLIC_URL + "/Images/pic1.jpg",
    title: "48MP on All Three Cameras",
    category: "Camera",
    desc: "Triple 48MP quad-pixel sensors providing extreme sharpness across all focal lengths.",
    alt: "48MP Pro Fusion camera system across all three lenses",
  },
  {
    img: process.env.PUBLIC_URL + "/Images/pic3.jpg",
    title: "Dedicated Camera Control & 4K 120 fps",
    category: "Cinematic",
    desc: "Sapphire crystal capacitive button with haptic feedback for instant exposure and zoom control.",
    alt: "Dedicated tactile Camera Control and 4K 120 fps Dolby Vision",
  },
  {
    img: process.env.PUBLIC_URL + "/Images/pic5.jpg",
    title: "6.9″ Super Retina XDR Display",
    category: "Display",
    desc: "ProMotion 120Hz adaptive refresh rate with 3000 nits outdoor peak brightness.",
    alt: "6.9″ Super Retina XDR display with ProMotion 120Hz",
  },
  {
    img: process.env.PUBLIC_URL + "/Images/p3.jpg",
    title: "Night Mode & Next-Gen Portraits",
    category: "Photonic",
    desc: "Deep Fusion and Photonic Engine for true-to-life skin tones and low-noise night captures.",
    alt: "Night mode and next-gen portraits with Photonic Engine",
  },
  {
    img: process.env.PUBLIC_URL + "/Images/pic4.jpg",
    title: "Up to 37 Hours Video Playback",
    category: "Battery",
    desc: "The longest continuous battery life ever engineered into an iPhone.",
    alt: "37-Hour Battery Architecture for all-day creative workflows",
  },
  {
    img: process.env.PUBLIC_URL + "/Images/p4.jpg",
    title: "Apple Intelligence On-Device",
    category: "Intelligence",
    desc: "16-core Neural Engine executing 35 trillion operations per second privately on device.",
    alt: "On-device Apple Intelligence powered by 16-Core Neural Engine",
  },
];

function AutoScroller() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % HIGHLIGHT_SLIDES.length);
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + HIGHLIGHT_SLIDES.length) % HIGHLIGHT_SLIDES.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % HIGHLIGHT_SLIDES.length);
  };

  return (
    <section
      className="auto-scroll-section"
      id="highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="iPhone 17 Pro Max Product Highlights Carousel"
    >
      <div className="auto-scroll-header">
        <span className="auto-eyebrow">Highlights</span>
        <h2 className="auto-title">iPhone 17 Pro Max Highlights</h2>
        <p className="auto-subtitle">
          Explore groundbreaking engineering, camera breakthroughs, and A19 Pro silicon at a glance.
        </p>
      </div>

      <div className="auto-carousel-viewport">
        <button
          type="button"
          className="carousel-arrow-btn arrow-prev"
          onClick={handlePrev}
          aria-label="Previous highlight slide"
        >
          ‹
        </button>

        <div
          className="auto-scroll-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {HIGHLIGHT_SLIDES.map((slide, i) => (
            <div className="auto-slide" key={slide.title}>
              <div className="auto-card">
                <div className="auto-img-wrap">
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className="auto-img"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = process.env.PUBLIC_URL + "/Images/pic1.jpg";
                    }}
                  />
                  <div className="auto-category-badge">{slide.category}</div>
                </div>
                <div className="auto-card-content">
                  <h3 className="auto-card-title">{slide.title}</h3>
                  <p className="auto-card-desc">{slide.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="carousel-arrow-btn arrow-next"
          onClick={handleNext}
          aria-label="Next highlight slide"
        >
          ›
        </button>
      </div>

      {/* Slide dots and counter */}
      <div className="auto-footer-controls">
        <div className="auto-dots" role="tablist" aria-label="Highlight slides">
          {HIGHLIGHT_SLIDES.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              className={`auto-dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              role="tab"
              aria-selected={i === index}
            />
          ))}
        </div>
        <div className="auto-counter">
          <span>{index + 1}</span> / <span>{HIGHLIGHT_SLIDES.length}</span>
        </div>
      </div>
    </section>
  );
}

export default AutoScroller;
