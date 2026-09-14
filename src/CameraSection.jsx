import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CameraSection.css";

gsap.registerPlugin(ScrollTrigger);

const FOCAL_DIALS = [
  { label: "0.5x", focal: "13 mm", lens: "Ultra Wide", aperture: "ƒ/2.2", fov: "120° FOV • Macro", mmVal: 13 },
  { label: "1x", focal: "24 mm", lens: "Main Fusion", aperture: "ƒ/1.78", fov: "2nd-gen Sensor-shift OIS", mmVal: 24 },
  { label: "2x", focal: "48 mm", lens: "Optical-Quality", aperture: "ƒ/1.78", fov: "Quad-Pixel Telephoto Crop", mmVal: 48 },
  { label: "5x", focal: "120 mm", lens: "Telephoto", aperture: "ƒ/2.8", fov: "Tetraprism Optical Subsystem", mmVal: 120 },
  { label: "8x", focal: "200 mm", lens: "Optical-Quality", aperture: "ƒ/2.8", fov: "3D Sensor-Shift OIS Reach", mmVal: 200 },
  { label: "Front", focal: "18MP", lens: "Center Stage", aperture: "ƒ/1.9", fov: "Autofocus • 4K Dolby Vision", mmVal: 22 },
  { label: "Control", focal: "Tactile", lens: "Camera Control", aperture: "Haptic", fov: "Sapphire Force Sensor", mmVal: 75 },
];

export default function CameraSection() {
  const [activeDial, setActiveDial] = useState(4); // default 8x
  const [zoomFocal, setZoomFocal] = useState(200);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".camera-header-group", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
      });

      gsap.from(".camera-video-wrapper", {
        scrollTrigger: {
          trigger: ".camera-video-wrapper",
          start: "top 80%",
        },
        scale: 0.94,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      gsap.from(".focal-dial-bar", {
        scrollTrigger: {
          trigger: ".focal-dial-bar",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDialClick = (dial, index) => {
    setActiveDial(index);
    setZoomFocal(dial.mmVal);
  };

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setZoomFocal(val);
    if (val <= 18) {
      setActiveDial(0);
    } else if (val <= 35) {
      setActiveDial(1);
    } else if (val <= 70) {
      setActiveDial(2);
    } else if (val <= 150) {
      setActiveDial(3);
    } else {
      setActiveDial(4);
    }
  };

  const currentDial = FOCAL_DIALS[activeDial];

  return (
    <section className="camera-section" ref={sectionRef} id="camera">
      <div className="camera-center">
        <div className="camera-header-group">
          <span className="camera-eyebrow">Visual Storytelling</span>
          <h2 className="camera-main-title">48MP Pro Fusion camera system</h2>
          <p className="camera-main-desc">
            Triple 48MP Fusion rear sensors with 8x optical-quality zoom, ultra-wide macro, tactile Camera Control, and 4K 120 fps Dolby Vision.
          </p>
        </div>

        <div className="camera-video-wrapper">
          <div className="camera-video-badge">
            <span className="rec-dot" />
            4K 120 fps Dolby Vision Preview
          </div>

          {/* Viewfinder HUD overlay with Apple Camera UI detailing */}
          <div className="camera-hud-overlay">
            {/* Viewfinder corner brackets */}
            <div className="hud-corner-bracket hud-tl" />
            <div className="hud-corner-bracket hud-tr" />
            <div className="hud-corner-bracket hud-bl" />
            <div className="hud-corner-bracket hud-br" />

            {/* Central focus reticle */}
            <div className="hud-center-reticle">
              <span className="reticle-cross" />
            </div>

            <div className="hud-top-bar">
              <div className="hud-lens-tag">
                <span className="hud-zoom">{currentDial.label}</span>
                <span className="hud-focal">{zoomFocal} mm • {currentDial.lens}</span>
              </div>
              <div className="hud-specs-tag">
                <span>{currentDial.aperture}</span>
                <span className="hud-dot">•</span>
                <span>1/120s</span>
                <span className="hud-dot">•</span>
                <span>ISO 64</span>
              </div>
            </div>

            <div className="hud-bottom-bar">
              <div className="hud-audio-meter">
                <span className="audio-label">AUDIO MIX:</span>
                <div className="audio-bars">
                  <span className="audio-bar" />
                  <span className="audio-bar" />
                  <span className="audio-bar" />
                  <span className="audio-bar" />
                </div>
              </div>
              <div className="hud-format-tag">4K • 120 FPS • DOLBY VISION</div>
            </div>
          </div>

          <video
            ref={videoRef}
            className="camera-video"
            src={process.env.PUBLIC_URL + "/camerateaser.mp4"}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        {/* Pro Optical Focal Length Dial Selector */}
        <div className="focal-dial-bar" role="tablist" aria-label="Camera Focal Length Dial">
          <span className="dial-title">Optical Focal Length:</span>
          <div className="dial-buttons-row">
            {FOCAL_DIALS.map((dial, idx) => (
              <button
                key={dial.label}
                type="button"
                className={`focal-dial-btn ${activeDial === idx ? "active" : ""}`}
                onClick={() => handleDialClick(dial, idx)}
                aria-selected={activeDial === idx}
                role="tab"
              >
                <span className="dial-btn-zoom">{dial.label}</span>
                <span className="dial-btn-focal">{dial.focal}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Tactile Camera Control Scrubber */}
        <div className="camera-control-interactive-bar">
          <div className="scrubber-header">
            <span className="scrubber-title">
              <span className="scrubber-pill">Camera Control</span>
              Slide to adjust focal length smoothly:
            </span>
            <span className="scrubber-reading">{zoomFocal} mm ({currentDial.label})</span>
          </div>
          <div className="scrubber-track-wrap">
            <span className="scrubber-min">13 mm (0.5x)</span>
            <input
              type="range"
              min="13"
              max="200"
              value={zoomFocal}
              onChange={handleSliderChange}
              className="tactile-scrub-input"
              aria-label="Tactile Camera Control Focal Length Slider"
            />
            <span className="scrubber-max">200 mm (8x)</span>
          </div>
        </div>

        {/* Active Pro Optical Specification Footer */}
        <div className="camera-active-specs-bar">
          <span className="active-specs-prefix">Pro Optical Specification:</span>
          <span className="active-specs-text">
            {currentDial.lens} ({currentDial.label}) • {zoomFocal} mm equivalent • {currentDial.aperture} • {currentDial.fov}
          </span>
        </div>
      </div>
    </section>
  );
}
