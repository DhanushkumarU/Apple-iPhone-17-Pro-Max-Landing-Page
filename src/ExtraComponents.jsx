import React, { useState } from "react";
import {
  Camera,
  Check,
  Film,
  Gamepad2,
  Leaf,
  Map,
  Package,
  Recycle,
  Ruler,
  Sofa,
  Zap,
  Crosshair,
  Navigation,
  Box,
  AudioWaveform,
} from "lucide-react";
import "./ExtraComponents.css";

const ICON_SIZE = 28;
const ICON_SIZE_SM = 20;

// 1. PRO WORKFLOWS SECTION
export function ProWorkflows() {
  const workflows = [
    {
      id: "optics",
      eyebrow: "01 / OPTICAL SUBSYSTEM",
      title: "Professional Photography",
      desc: "48MP Pro Fusion system captures 48MP ProRAW across all three lenses with next-generation depth control and zero shutter lag.",
      Icon: Camera,
      specs: [
        { label: "Sensor", value: "Triple 48MP Pro Fusion" },
        { label: "Pipeline", value: "48MP ProRAW @ 24/48mm" },
        { label: "Range", value: "13mm – 200mm equiv." },
        { label: "Optics", value: "8x Optical-Quality Zoom" }
      ],
      motif: "aperture"
    },
    {
      id: "cinema",
      eyebrow: "02 / CINEMA ACES PIPELINE",
      title: "Video Production",
      desc: "Shoot cinema-grade 4K 120 fps Dolby Vision with ProRes Log encoding, ACES workflow compliance, and dedicated capture control.",
      Icon: Film,
      specs: [
        { label: "Mastering", value: "4K 120 fps Dolby Vision" },
        { label: "Color Space", value: "ACES & Apple Log" },
        { label: "Interface", value: "Camera Control Button" },
        { label: "Audio", value: "Studio 4-Mic Array" }
      ],
      motif: "cinema"
    },
    {
      id: "silicon",
      eyebrow: "03 / SILICON COMPUTING",
      title: "Gaming Excellence",
      desc: "A19 Pro 6-core GPU delivers console-quality gaming with 2x faster hardware-accelerated ray tracing and MetalFX upscaling.",
      Icon: Gamepad2,
      specs: [
        { label: "GPU Core", value: "A19 Pro 6-Core Compute" },
        { label: "Ray Tracing", value: "2x Hardware Acceleration" },
        { label: "Display", value: "120Hz ProMotion OLED" },
        { label: "Thermal", value: "Sub-Nanometer Graphite" }
      ],
      motif: "silicon"
    },
    {
      id: "neural",
      eyebrow: "04 / NEURAL ARCHITECTURE",
      title: "Audio & Intelligence",
      desc: "On-device 16-core Neural Engine processes Apple Intelligence at 35 TOPS, paired with vocal isolation and studio Spatial Audio.",
      Icon: AudioWaveform,
      specs: [
        { label: "NPU", value: "35 TOPS Neural Engine" },
        { label: "Acoustics", value: "Audio Mix Vocal Isolation" },
        { label: "Security", value: "Private Cloud Compute" },
        { label: "Latency", value: "Sub-millisecond Pipeline" }
      ],
      motif: "waveform"
    }
  ];

  return (
    <section className="pro-workflows">
      <div className="container">
        <div className="pro-header-wrap">
          <span className="pro-eyebrow-main">PRO CAPABILITIES</span>
          <h2 className="section-title-extra">Built for professionals.</h2>
          <p className="section-subtitle-extra">
            iPhone 17 Pro Max is engineered for demanding production workflows. From multi-focal 48MP Pro Fusion imaging 
            to A19 Pro real-time graphics and studio acoustics.
          </p>
        </div>

        <div className="pro-editorial-grid">
          {workflows.map((workflow) => {
            const WorkflowIcon = workflow.Icon;
            return (
              <article key={workflow.id} className="pro-editorial-module">
                <div className={`pro-motif pro-motif-${workflow.motif}`} aria-hidden="true">
                  {workflow.motif === "aperture" && (
                    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor">
                      <circle cx="60" cy="60" r="54" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="60" cy="60" r="38" strokeWidth="1" />
                      <circle cx="60" cy="60" r="20" strokeWidth="1.5" />
                      <line x1="60" y1="6" x2="60" y2="26" strokeWidth="1" />
                      <line x1="60" y1="94" x2="60" y2="114" strokeWidth="1" />
                      <line x1="6" y1="60" x2="26" y2="60" strokeWidth="1" />
                      <line x1="94" y1="60" x2="114" y2="60" strokeWidth="1" />
                    </svg>
                  )}
                  {workflow.motif === "cinema" && (
                    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor">
                      <rect x="14" y="24" width="92" height="72" rx="4" strokeWidth="1" />
                      <path d="M14 42h92M14 78h92" strokeWidth="0.8" strokeDasharray="2 3" />
                      <circle cx="34" cy="33" r="2.5" fill="currentColor" />
                      <circle cx="60" cy="33" r="2.5" fill="currentColor" />
                      <circle cx="86" cy="33" r="2.5" fill="currentColor" />
                      <path d="M52 52l20 10-20 10V52z" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                  )}
                  {workflow.motif === "silicon" && (
                    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor">
                      <rect x="22" y="22" width="76" height="76" rx="6" strokeWidth="1" />
                      <rect x="36" y="36" width="48" height="48" rx="2" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="12" y1="38" x2="22" y2="38" strokeWidth="1.2" />
                      <line x1="12" y1="60" x2="22" y2="60" strokeWidth="1.2" />
                      <line x1="12" y1="82" x2="22" y2="82" strokeWidth="1.2" />
                      <line x1="98" y1="38" x2="108" y2="38" strokeWidth="1.2" />
                      <line x1="98" y1="60" x2="108" y2="60" strokeWidth="1.2" />
                      <line x1="98" y1="82" x2="108" y2="82" strokeWidth="1.2" />
                    </svg>
                  )}
                  {workflow.motif === "waveform" && (
                    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor">
                      <path d="M14 60h12l6-18 8 36 8-48 8 60 8-36 8 18 8-8 6 8h16" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="60" cy="60" r="48" strokeWidth="0.8" strokeDasharray="3 4" />
                    </svg>
                  )}
                </div>

                <div className="pro-module-header">
                  <span className="pro-module-eyebrow">{workflow.eyebrow}</span>
                  <div className="pro-module-icon-wrap" aria-hidden="true">
                    <WorkflowIcon size={18} strokeWidth={1.75} />
                  </div>
                </div>

                <h3 className="pro-module-title">{workflow.title}</h3>
                <p className="pro-module-desc">{workflow.desc}</p>

                <div className="pro-spec-matrix">
                  {workflow.specs.map((spec, idx) => (
                    <div key={idx} className="pro-spec-row">
                      <span className="pro-spec-label">{spec.label}</span>
                      <span className="pro-spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 2. UNIBODY DESIGN INTERACTIVE
export function AluminiumDesign() {
  const [selectedMaterial, setSelectedMaterial] = useState("aluminium");

  const materials = {
    aluminium: {
      name: "Precision Aluminium Unibody",
      badge: "Custom 7000-Series Alloy",
      properties: ["100% Recycled", "Thermal Optimization", "Ultra Durable"],
      weight: "221g",
      strength: "Precision-machined unibody enclosure",
      desc: "Machined from a single solid block of aerospace-grade 100% recycled aluminium with seamless edge contours and integrated camera plateau.",
      image: process.env.PUBLIC_URL + "/Images/p1.jpg",
      hotspots: [
        { label: "CNC Machined Plateau", x: "32%", y: "22%" },
        { label: "Sub-Micron Chamfer", x: "78%", y: "45%" },
        { label: "100% Recycled Core", x: "42%", y: "78%" },
      ]
    },
    glass: {
      name: "Ceramic Shield 2 Front",
      badge: "Ceramic Shield 2",
      properties: ["2x Tougher Front", "Dual-Ion Exchange", "Superior Scratch Resistance"],
      weight: "Front Display",
      strength: "2x tougher than any smartphone glass",
      desc: "Advanced nanoceramic crystals embedded into glass matrix with Ceramic Shield 2 front for double the drop and scratch resilience.",
      image: process.env.PUBLIC_URL + "/Images/pic5.jpg",
      hotspots: [
        { label: "Nano-Ceramic Matrix", x: "50%", y: "25%" },
        { label: "Dual-Ion Exchange", x: "30%", y: "60%" },
        { label: "Oleophobic Coating", x: "68%", y: "75%" },
      ]
    },
    frame: {
      name: "Internal Substructure",
      badge: "Thermal Architecture",
      properties: ["Thermal Diffusion", "100% Recycled Aluminium", "Rigid Architecture"],
      weight: "Integrated frame",
      strength: "Laser-welded internal architecture",
      desc: "Rigid internal substructure bonded with 100% recycled graphite heat spreaders, ensuring sustained high-frequency A19 Pro gaming.",
      image: process.env.PUBLIC_URL + "/Images/file2.jpg",
      hotspots: [
        { label: "Graphite Heat Conduits", x: "48%", y: "30%" },
        { label: "Laser-Welded Bonding", x: "72%", y: "55%" },
        { label: "Structural Ribs", x: "28%", y: "70%" },
      ]
    }
  };

  const current = materials[selectedMaterial];

  return (
    <section className="aluminium-design">
      <div className="container">
        <h2 className="section-title-extra">Aluminium unibody. Engineered to endure.</h2>
        <p className="section-subtitle-extra">
          iPhone 17 Pro Max features an advanced 100% recycled precision aluminium unibody enclosure that is 
          remarkably light, structurally resilient, and thermally optimized for sustained peak performance.
        </p>

        <div className="design-interactive">
          <div className="unibody-showcase-stage">
            <div className="cad-grid-backdrop">
              <span className="cad-marker top-left">+</span>
              <span className="cad-marker top-right">+</span>
              <span className="cad-marker bottom-left">+</span>
              <span className="cad-marker bottom-right">+</span>
            </div>

            <div className="unibody-viewport-card">
              <div className="unibody-image-wrapper">
                <img
                  src={current.image}
                  alt={current.name}
                  className="unibody-feature-img"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = process.env.PUBLIC_URL + "/Images/p1.jpg";
                  }}
                />
                <div className="unibody-image-overlay" />
              </div>

              {/* Technical Callout Hotspots */}
              <div className="unibody-hotspots-layer">
                {current.hotspots.map((hs, i) => (
                  <div
                    key={i}
                    className="unibody-hotspot"
                    style={{ left: hs.x, top: hs.y }}
                  >
                    <span className="hotspot-pulse" />
                    <span className="hotspot-pip" />
                    <span className="hotspot-tooltip">{hs.label}</span>
                  </div>
                ))}
              </div>

              {/* Viewport HUD Footer */}
              <div className="unibody-viewport-hud">
                <div className="hud-material-badge">{current.badge}</div>
                <div className="hud-material-desc">{current.desc}</div>
              </div>
            </div>
          </div>

          <div className="material-selector">
            {Object.entries(materials).map(([key, data]) => (
              <button
                key={key}
                type="button"
                className={`material-btn ${selectedMaterial === key ? "active" : ""}`}
                onClick={() => setSelectedMaterial(key)}
              >
                <div className="material-info">
                  <div className="material-header-row">
                    <h3>{data.name}</h3>
                    <span className="material-pill">{data.badge}</span>
                  </div>
                  <div className="material-props">
                    {data.properties.map((prop, idx) => (
                      <span key={idx} className="prop-badge">{prop}</span>
                    ))}
                  </div>
                  <div className="material-specs">
                    <p><strong>Weight:</strong> {data.weight}</p>
                    <p><strong>Strength:</strong> {data.strength}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. SPATIAL COMPUTING & AR
export function SpatialComputing() {
  const [activeDemo, setActiveDemo] = useState("ar-measure");

  const demos = {
    "ar-measure": {
      id: "ar-measure",
      title: "AR Measurement & LiDAR Scanning",
      tag: "Time-of-Flight LiDAR",
      desc: "Sub-millimetre spatial measurement overlays. Instantly calculate room dimensions, object heights, and surface planes with laser accuracy.",
      Icon: Ruler,
      badge: "LiDAR Active • ±1mm",
      image: process.env.PUBLIC_URL + "/Images/pic3.jpg",
      hud: {
        type: "measure",
        dim1: "Length: 163.0 mm",
        dim2: "Width: 77.6 mm",
        depth: "Depth: 8.25 mm",
        metric: "Area: 126.5 cm²",
        telemetry: "Point Cloud: 120,000 pts/sec",
      }
    },
    "ar-navigation": {
      id: "ar-navigation",
      title: "AR Navigation & Spatial Waypoints",
      tag: "Visual Positioning System",
      desc: "Heads-up turn-by-turn guidance projected directly onto your path. Floating 3D direction arrows anchor seamlessly to real-world street corners.",
      Icon: Map,
      badge: "RTK GPS + LiDAR Fusion",
      image: process.env.PUBLIC_URL + "/Images/file7.jpg",
      hud: {
        type: "nav",
        turn: "In 120m Turn Right",
        street: "Regent Street",
        heading: "Heading: 042° NE",
        elevation: "Elevation: +14m",
        poi: "Landmark: St James Plaza • 300m",
      }
    },
    "ar-gaming": {
      id: "ar-gaming",
      title: "Immersive Spatial Gaming",
      tag: "ProMotion 120Hz & Metal 3",
      desc: "A19 Pro GPU with hardware ray tracing places virtual interactive worlds right in your room with realistic lighting, shadows, and physics occlusion.",
      Icon: Gamepad2,
      badge: "120 FPS Real-Time Physics",
      image: process.env.PUBLIC_URL + "/Images/file2.jpg",
      hud: {
        type: "game",
        target: "Target Locked: 3.2m",
        fps: "120 FPS MetalFX",
        shield: "Spatial Anchor: 100%",
        score: "Score: 14,850",
      }
    },
    "ar-shopping": {
      id: "ar-shopping",
      title: "AR Quick Look & Object Placement",
      tag: "Photorealistic USDZ",
      desc: "Preview products in your space at 100% true-to-life scale before purchasing. Environmental light estimation matches the room's color temperature.",
      Icon: Sofa,
      badge: "True 1:1 Scale",
      image: process.env.PUBLIC_URL + "/Images/p1.jpg",
      hud: {
        type: "shop",
        scale: "True Scale: 100% (1:1)",
        surface: "Surface: Detected Hardwood Floor",
        light: "Ambient Match: 4,200K Kelvin",
        action: "Pinch to inspect • Rotate 360°",
      }
    }
  };

  const current = demos[activeDemo];

  return (
    <section className="spatial-computing">
      <div className="container">
        <h2 className="section-title-extra">Spatial computing. The world is your canvas.</h2>
        <p className="section-subtitle-extra">
          Advanced AR capabilities powered by the Time-of-Flight LiDAR Scanner and A19 Pro Neural Accelerators.
          Experience apps that seamlessly blend digital content with the physical environment.
        </p>

        <div className="ar-demo-area">
          {/* Spatial Viewport Showcase */}
          <div className="ar-viewport">
            <div className="ar-scene">
              <div className="ar-backdrop-wrapper">
                <img
                  src={current.image}
                  alt={current.title}
                  className="ar-backdrop-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = process.env.PUBLIC_URL + "/Images/p1.jpg";
                  }}
                />
                <div className="ar-backdrop-tint" />
              </div>

              {/* Spatial 3D Perspective Grid */}
              <div className="ar-spatial-grid" />

              {/* Mode-Specific Spatial HUD Overlays */}
              <div className="ar-hud-overlay">
                {/* Top Status Bar */}
                <div className="ar-hud-topbar">
                  <span className="ar-hud-badge">{current.badge}</span>
                  <span className="ar-hud-status">
                    <span className="ar-live-dot" /> LIVE SIMULATION
                  </span>
                </div>

                {/* Center AR Graphics for each mode */}
                {current.hud.type === "measure" && (
                  <div className="ar-measure-stage">
                    <div className="measure-box-frame">
                      <span className="measure-corner tl" />
                      <span className="measure-corner tr" />
                      <span className="measure-corner bl" />
                      <span className="measure-corner br" />
                      <div className="measure-crosshair">
                        <Crosshair size={28} />
                      </div>
                      <div className="measure-tag tag-w">{current.hud.dim1}</div>
                      <div className="measure-tag tag-h">{current.hud.dim2}</div>
                      <div className="measure-tag tag-d">{current.hud.depth}</div>
                    </div>
                    <div className="measure-metric-badge">{current.hud.metric}</div>
                  </div>
                )}

                {current.hud.type === "nav" && (
                  <div className="ar-nav-stage">
                    <div className="nav-waypoint-card">
                      <Navigation size={28} className="nav-arrow-icon" />
                      <div className="nav-waypoint-text">
                        <div className="nav-turn">{current.hud.turn}</div>
                        <div className="nav-street">{current.hud.street}</div>
                      </div>
                    </div>
                    <div className="nav-ground-path">
                      <span className="ground-chevron" />
                      <span className="ground-chevron" />
                      <span className="ground-chevron" />
                    </div>
                    <div className="nav-poi-pill">{current.hud.poi}</div>
                  </div>
                )}

                {current.hud.type === "game" && (
                  <div className="ar-game-stage">
                    <div className="game-reticle">
                      <div className="game-ring ring-outer" />
                      <div className="game-ring ring-inner" />
                      <span className="game-lock-text">{current.hud.target}</span>
                    </div>
                    <div className="game-hud-stat stat-left">{current.hud.fps}</div>
                    <div className="game-hud-stat stat-right">{current.hud.shield}</div>
                  </div>
                )}

                {current.hud.type === "shop" && (
                  <div className="ar-shop-stage">
                    <div className="shop-bounding-plane">
                      <div className="plane-grid-dots" />
                      <div className="shop-product-tag">
                        <Box size={16} />
                        <span>{current.hud.scale}</span>
                      </div>
                    </div>
                    <div className="shop-gesture-pill">{current.hud.action}</div>
                  </div>
                )}

                {/* Bottom HUD Information */}
                <div className="ar-hud-bottom">
                  <div className="ar-bottom-headline">{current.title}</div>
                  <div className="ar-bottom-desc">{current.desc}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive AR Demo Selector */}
          <div className="ar-demo-selector" role="tablist" aria-label="Spatial Computing Demonstrations">
            {Object.entries(demos).map(([key, data]) => {
              const DemoIcon = data.Icon;
              const isSelected = activeDemo === key;
              return (
                <button
                  key={key}
                  type="button"
                  className={`ar-demo-btn ${isSelected ? "active" : ""}`}
                  onClick={() => setActiveDemo(key)}
                  role="tab"
                  aria-selected={isSelected}
                >
                  <span className="demo-icon">
                    <DemoIcon size={ICON_SIZE_SM} />
                  </span>
                  <div className="demo-btn-text">
                    <span className="demo-name">{data.title}</span>
                    <span className="demo-tag">{data.tag}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. SUSTAINABILITY & ENVIRONMENT
export function Sustainability() {
  return (
    <section className="sustainability">
      <div className="container">
        <h2 className="section-title-extra">Better for you. Better for the planet.</h2>
        <p className="section-subtitle-extra">
          iPhone 17 Pro Max is designed to minimize its impact on the environment. 
          From recycled materials to renewable energy.
        </p>

        <div className="sustainability-grid">
          <div className="sustain-card">
            <div className="sustain-icon-circle">
              <div className="icon-large">
                <Recycle size={ICON_SIZE} />
              </div>
            </div>
            <h3>100% Recycled Materials</h3>
            <p>Rare earth elements in magnets made from 100% recycled materials</p>
            <div className="sustain-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Recycled Rare Earth</span>
            </div>
          </div>

          <div className="sustain-card">
            <div className="sustain-icon-circle">
              <div className="icon-large">
                <Leaf size={ICON_SIZE} />
              </div>
            </div>
            <h3>Carbon Neutral</h3>
            <p>First carbon neutral iPhone through renewable energy and offsets</p>
            <div className="sustain-stat">
              <span className="stat-number">0</span>
              <span className="stat-label">Net Carbon Emissions</span>
            </div>
          </div>

          <div className="sustain-card">
            <div className="sustain-icon-circle">
              <div className="icon-large">
                <Package size={ICON_SIZE} />
              </div>
            </div>
            <h3>Fiber-Based Packaging</h3>
            <p>100% of packaging comes from recycled and renewable sources</p>
            <div className="sustain-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Sustainable Packaging</span>
            </div>
          </div>

          <div className="sustain-card">
            <div className="sustain-icon-circle">
              <div className="icon-large">
                <Zap size={ICON_SIZE} />
              </div>
            </div>
            <h3>Renewable Energy</h3>
            <p>Final assembly powered by 100% renewable energy</p>
            <div className="sustain-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Clean Energy</span>
            </div>
          </div>
        </div>

        <div className="commitment-banner">
          <p>Apple is committed to becoming carbon neutral across our entire business by 2030.</p>
        </div>
      </div>
    </section>
  );
}

// 5. TRADE-IN & FINANCING
export function TradeInFinancing() {
  const [selectedTradein, setSelectedTradein] = useState("iphone-16");

  const tradeins = {
    "iphone-16": { name: "iPhone 16 Pro Max", value: "$650" },
    "iphone-15": { name: "iPhone 15 Pro Max", value: "$520" },
    "iphone-14": { name: "iPhone 14 Pro Max", value: "$380" },
    "iphone-13": { name: "iPhone 13 Pro Max", value: "$280" }
  };

  const basePrice = 1199;
  const tradeValue = parseInt(tradeins[selectedTradein].value.replace('$', ''));
  const finalPrice = basePrice - tradeValue;

  return (
    <section className="tradein-financing">
      <div className="container">
        <h2 className="section-title-extra">Get iPhone 17 Pro Max from ${finalPrice}/mo or ${finalPrice} with trade‑in.*</h2>
        <p className="section-subtitle-extra">
          Trade in your current iPhone and get credit toward a new one. 
          Or pay monthly at 0% APR when you choose to check out with Apple Card.
        </p>

        <div className="tradein-calculator">
          <div className="calculator-panel">
            <h3>Trade-in Calculator</h3>
            
            <div className="tradein-selector">
              <label>Select your current iPhone:</label>
              <div className="tradein-options">
                {Object.entries(tradeins).map(([key, data]) => (
                  <button
                    key={key}
                    className={`tradein-option ${selectedTradein === key ? "active" : ""}`}
                    onClick={() => setSelectedTradein(key)}
                  >
                    <span className="option-name">{data.name}</span>
                    <span className="option-value">{data.value}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>iPhone 17 Pro Max</span>
                <span>${basePrice}</span>
              </div>
              <div className="price-row trade">
                <span>Trade-in credit</span>
                <span className="credit">-{tradeins[selectedTradein].value}</span>
              </div>
              <div className="price-row total">
                <span>Your price</span>
                <span className="final">${finalPrice}</span>
              </div>
            </div>

            <div className="financing-options">
              <button className="financing-btn primary">
                <span>Pay ${Math.round(finalPrice / 24)}/mo for 24 months**</span>
              </button>
              <button className="financing-btn secondary">
                <span>Buy for ${finalPrice}</span>
              </button>
            </div>
          </div>

          <div className="tradein-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">
                <Check size={ICON_SIZE_SM} />
              </div>
              <div className="benefit-text">
                <h4>Easy trade-in</h4>
                <p>Get a prepaid trade-in kit delivered to your door</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <Check size={ICON_SIZE_SM} />
              </div>
              <div className="benefit-text">
                <h4>0% APR financing</h4>
                <p>Pay over time with Apple Card at 0% APR</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <Check size={ICON_SIZE_SM} />
              </div>
              <div className="benefit-text">
                <h4>Free delivery</h4>
                <p>Get your new iPhone delivered for free</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <Check size={ICON_SIZE_SM} />
              </div>
              <div className="benefit-text">
                <h4>Data transfer</h4>
                <p>Easily move your data from your old iPhone</p>
              </div>
            </div>
          </div>
        </div>

        <p className="disclaimer">
          * Monthly pricing requires qualifying credit and 24-month installment loan. 
          ** Trade-in values vary based on condition, year, and configuration of your trade-in device.
        </p>
      </div>
    </section>
  );
}
