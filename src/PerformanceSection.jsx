import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PerformanceSection.css";

gsap.registerPlugin(ScrollTrigger);

const performanceImages = [
  {
    url: process.env.PUBLIC_URL + "/Images/file2.jpg",
    title: "A19 Pro Silicon",
    tag: "3nm Architecture",
    story: "The fastest chip ever in a smartphone. Features a 6-core GPU with 2x faster hardware-accelerated ray tracing and breakthrough energy efficiency.",
    statLabel: "Ray Tracing",
    statValue: "2x Faster",
    alt: "A19 Pro Chip - Industry-leading compute and graphics performance",
  },
  {
    url: process.env.PUBLIC_URL + "/Images/p1.jpg",
    title: "Precision Aluminium Finishes",
    tag: "Aerospace Craftsmanship",
    story: "Crafted from high-strength precision aluminium unibody with micro-blasted satin textures in Cosmic Orange, Natural, Black, White, and Deep Blue finishes.",
    statLabel: "Enclosure",
    statValue: "100% Recycled",
    alt: "iPhone 17 Pro Max in precision aluminium unibody finishes",
  },
  {
    url: process.env.PUBLIC_URL + "/Images/pic5.jpg",
    title: "6.9″ Super Retina XDR",
    tag: "ProMotion 120Hz",
    story: "Expansive 6.9-inch OLED display with Always-On technology, 1-120Hz adaptive refresh rates, and 3000 nits outdoor peak brightness.",
    statLabel: "Peak Brightness",
    statValue: "3000 nits",
    alt: "Super Retina XDR Display with ProMotion and Always-On",
  },
  {
    url: process.env.PUBLIC_URL + "/Images/cam2.jpg",
    title: "Unified Silicon & Wi-Fi 7",
    tag: "Next-Gen Connectivity",
    story: "Apple-designed Wi-Fi 7 wireless silicon delivering 2.4x faster wireless speeds with 320 MHz channels and ultra-low latency.",
    statLabel: "Throughput",
    statValue: "2.4x Faster",
    alt: "Next-generation A19 Pro architecture with Wi-Fi 7",
  },
  {
    url: process.env.PUBLIC_URL + "/Images/file5.jpg",
    title: "Precision Thermal Dissipation",
    tag: "Sustained Gaming",
    story: "Laser-welded internal graphite heat spreaders offer up to 20% better sustained performance for AAA console-class gaming.",
    statLabel: "Sustained Gaming",
    statValue: "+20% Thermal",
    alt: "Aluminium unibody with advanced graphite thermal architecture",
  },
  {
    url: process.env.PUBLIC_URL + "/Images/cam4.jpg",
    title: "Contoured Unibody Profile",
    tag: "Precision Ergonomics",
    story: "The thinnest borders on any Apple product, paired with smoothly contoured edges for the most comfortable in-hand feel.",
    statLabel: "Border Width",
    statValue: "Sub-1.2mm",
    alt: "Contoured aerospace-grade aluminium unibody frame profile",
  },
  {
    url: process.env.PUBLIC_URL + "/Images/pic4.jpg",
    title: "37-Hour Battery Architecture",
    tag: "All-Day Pro Power",
    story: "High-density battery chemistry combined with A19 Pro efficiency yields up to 37 hours of continuous video playback.",
    statLabel: "Video Playback",
    statValue: "37 Hours",
    alt: "Breakthrough all-day battery life architecture",
  },
  {
    url: process.env.PUBLIC_URL + "/Images/p4.jpg",
    title: "Apple Intelligence On-Device",
    tag: "16-Core Neural Engine",
    story: "Personal intelligence system running 35 trillion operations per second locally with Private Cloud Compute confidentiality.",
    statLabel: "Compute Speed",
    statValue: "35 TOPS",
    alt: "Apple Intelligence and live on-device translation",
  },
];

const SILICON_STATS = [
  {
    id: "cpu",
    label: "6-Core CPU",
    highlight: "2 Performance + 4 Efficiency",
    metricNum: "15%",
    metricDesc: "Faster CPU compute than prior generation",
    detail: "Fastest CPU architecture in any smartphone, combining ultra-wide execution engines with deep power optimization.",
    story: "Handles heavy creative workloads, instantaneous photo stacking, and multi-app rendering while sipping minimal battery power.",
  },
  {
    id: "gpu",
    label: "6-Core GPU",
    highlight: "Neural Accelerators",
    metricNum: "2x",
    metricDesc: "Faster hardware-accelerated ray tracing",
    detail: "Pro-class graphics with hardware-accelerated ray tracing and Neural Accelerators for AAA console gaming.",
    story: "Delivers fluid frame rates, photorealistic reflections, dynamic shadows, and mesh shading for next-level visual storytelling.",
  },
  {
    id: "npu",
    label: "16-Core Neural Engine",
    highlight: "35 Trillion Ops/Sec",
    metricNum: "35 TOPS",
    metricDesc: "On-device private generative processing",
    detail: "Dedicated machine-learning processor built from the ground up to power Apple Intelligence on-device.",
    story: "Runs complex generative models, live speech translation, and visual intelligence privately on device with zero cloud latency.",
  },
  {
    id: "battery",
    label: "Up to 37 hrs",
    highlight: "VIDEO PLAYBACK",
    metricNum: "37 hrs",
    metricDesc: "Continuous video playback duration",
    detail: "Breakthrough internal power architecture combining high-density cells with A19 Pro efficiency.",
    story: "The longest continuous battery life ever engineered into an iPhone, delivering all-day and all-night creative endurance.",
  },
];

export default function PerformanceSection() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedStatIndex, setSelectedStatIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const autoRotateInterval = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      const ctx = gsap.context(() => {
        gsap.from(".performance-header-group", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });

        gsap.from(".silicon-stat-pill", {
          scrollTrigger: {
            trigger: ".silicon-stats-strip",
            start: "top 80%",
          },
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".carousel-3d-container", {
          scrollTrigger: {
            trigger: ".carousel-3d-container",
            start: "top 85%",
          },
          scale: 0.92,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;

    const itemCount = performanceImages.length;
    const radius = 270;

    function setItems() {
      const slides = carouselRef.current.children;
      for (let i = 0; i < itemCount; i++) {
        const theta = (360 / itemCount) * i;
        slides[i].style.transform =
          `rotateY(${theta}deg) translateZ(${radius}px) rotateX(-8deg)`;
      }
      carouselRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
    }

    setItems();

    let isVisible = true;
    let observer = null;
    if (typeof IntersectionObserver !== "undefined" && carouselRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(carouselRef.current);
    }

    autoRotateInterval.current = setInterval(() => {
      if (isVisible && isAutoRotating && !draggingRef.current && carouselRef.current) {
        angleRef.current -= 0.3;
        carouselRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      }
    }, 40);

    function onPointerMove(e) {
      if (!draggingRef.current || !carouselRef.current) return;
      const dx = e.clientX - startXRef.current;
      angleRef.current = startAngleRef.current + dx * 0.4;
      carouselRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
    }

    function onPointerUp() {
      draggingRef.current = false;
    }

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      if (autoRotateInterval.current) clearInterval(autoRotateInterval.current);
    };
  }, [isAutoRotating]);

  function handlePointerDown(e) {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startAngleRef.current = angleRef.current;
    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
  }

  function handleCardClick(index) {
    const itemCount = performanceImages.length;
    const theta = (360 / itemCount) * index;
    angleRef.current = -theta;
    if (carouselRef.current) {
      carouselRef.current.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
      carouselRef.current.style.transform = `rotateY(${-theta}deg)`;
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = "transform 0.1s linear";
        }
      }, 600);
    }
    setActiveCardIndex(index);
  }

  const current = performanceImages[activeCardIndex];
  const activeStat = SILICON_STATS[selectedStatIndex];

  return (
    <section className="performance-section" ref={sectionRef} id="performance">
      <div className="performance-header-group">
        <span className="performance-eyebrow">A19 Pro Silicon</span>
        <h2 className="performance-title">A19 Pro Performance</h2>
        <p className="performance-desc">
          Phenomenal 3nm compute, pro-class GPU graphics with Neural Accelerators, and next-generation Apple Intelligence.
        </p>
      </div>

      {/* Progressive Information Disclosure Stats Strip */}
      <div className="silicon-stats-strip" role="tablist">
        {SILICON_STATS.map((stat, i) => (
          <button
            key={stat.id}
            type="button"
            className={`silicon-stat-pill ${selectedStatIndex === i ? "active" : ""}`}
            onClick={() => setSelectedStatIndex(i)}
            role="tab"
            aria-selected={selectedStatIndex === i}
          >
            <div className="silicon-pill-label">{stat.label}</div>
            <div className="silicon-pill-highlight">{stat.highlight}</div>
          </button>
        ))}
      </div>

      {/* Active Silicon Architecture Progressive Disclosure Box with Benchmark Pill */}
      <div className="silicon-deepdive-box">
        <div className="deepdive-top-row">
          <div className="deepdive-badge">{activeStat.label} Architecture</div>
          <div className="deepdive-metric-badge">
            <span className="metric-bold">{activeStat.metricNum}</span>
            <span className="metric-text">{activeStat.metricDesc}</span>
          </div>
        </div>
        <div className="deepdive-title">{activeStat.detail}</div>
        <div className="deepdive-desc">{activeStat.story}</div>
      </div>

      <div
        className="carousel-3d-container"
        onPointerDown={handlePointerDown}
        aria-label="360 degree performance 3D carousel"
      >
        <div className="carousel-3d" ref={carouselRef}>
          {performanceImages.map((image, i) => (
            <div
              className={`carousel-3d-card ${activeCardIndex === i ? "active" : ""}`}
              key={image.url}
              onClick={() => handleCardClick(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(i);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Select ${image.title}`}
              title={image.title}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="carousel-3d-img"
                loading="lazy"
                decoding="async"
              />
              <div className="card-overlay-badge">{image.tag}</div>
              <div className="card-overlay-stat">{image.statValue}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Story Highlight with Carousel Controls */}
      <div className="active-card-story-card">
        <div className="story-header">
          <div>
            <span className="story-tag">{current.tag}</span>
            <h3 className="story-title">{current.title}</h3>
          </div>
          <div className="story-stat-pill">
            <span className="story-stat-label">{current.statLabel}</span>
            <span className="story-stat-val">{current.statValue}</span>
          </div>
        </div>
        <p className="story-text">{current.story}</p>
        <div className="story-footer-row">
          <div className="story-hint">
            <span>✦ Drag cylinder to rotate 360° • Click any frame to focus</span>
          </div>
          <button
            type="button"
            className="carousel-pause-btn"
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            aria-label={isAutoRotating ? "Pause auto-rotation" : "Resume auto-rotation"}
          >
            {isAutoRotating ? "⏸ Pause Rotation" : "▶ Resume Rotation"}
          </button>
        </div>
      </div>
    </section>
  );
}
