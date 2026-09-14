import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { COLORS, createPhase3IPhoneGroup } from "./IPhone17ProMax";
import {
  Battery,
  Car,
  CreditCard,
  Droplets,
  Pause,
  Play,
  Satellite,
  Smartphone,
  Sparkles,
  Target,
  Video,
  Zap,
  Check,
} from "lucide-react";
import "./AdvancedComponents.css";

const ICON_SIZE = 28;
const ICON_SIZE_SM = 22;

/* 1. CINEMATIC VIDEO SHOWCASE */
export function CinematicShowcase() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.loop = true;
    v.playbackRate = 2;

    const playPromise = v.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      v.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="cinematic-showcase">
      <div className="container">
        <h2 className="section-title-adv">
          Cinematic mode. Hollywood-level depth of field.
        </h2>
        <p className="section-subtitle-adv">
          Automatically shifts focus between subjects. Create beautiful videos
          with a depth-of-field effect that rivals professional cameras.
        </p>

        <div className="video-showcase-wrapper">
          <div className="video-container" onClick={togglePlay}>
            <div className="video-placeholder-cinematic">
              <div className={`play-overlay ${isPlaying ? "hidden" : ""}`}>
                <div className="play-btn-large">
                  <Play size={32} fill="currentColor" />
                </div>
                <p>Tap to watch Cinematic mode in action</p>
              </div>

              <video
                ref={videoRef}
                className="cinematic-video"
                src="cinematicvideo.mp4"
                autoPlay
                muted
                loop
                playsInline
              />

              <div className="video-background">
                <div className="cinematic-subject subject-1"></div>
                <div className="cinematic-subject subject-2"></div>
                <div className="blur-effect"></div>
              </div>
            </div>

            <div className="video-controls">
              <button
                type="button"
                className="control-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <span className="time-display">0:15</span>
            </div>
          </div>

          <div className="cinematic-features">
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Target size={ICON_SIZE} />
              </div>
              <h3>Auto Focus</h3>
              <p>Seamlessly shifts focus between subjects</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Video size={ICON_SIZE} />
              </div>
              <h3>4K HDR</h3>
              <p>Record in stunning 4K at 30fps</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Sparkles size={ICON_SIZE} />
              </div>
              <h3>Bokeh Effect</h3>
              <p>Beautiful background blur like DSLR</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. INTERACTIVE SIZE COMPARISON */
export function SizeComparison() {
  const [selectedModel, setSelectedModel] = useState("pro-max");

  const models = {
    "pro-max": {
      name: "iPhone 17 Pro Max",
      display: '6.9" Super Retina XDR',
      width: "77.6 mm",
      height: "163.0 mm",
      depth: "8.25 mm",
      weight: "221 g",
      chip: "A19 Pro",
      camera: "48MP Pro Fusion (8x Optical-Quality)",
    },
    pro: {
      name: "iPhone 17 Pro",
      display: '6.3" Super Retina XDR',
      width: "71.5 mm",
      height: "149.6 mm",
      depth: "8.25 mm",
      weight: "199 g",
      chip: "A19 Pro",
      camera: "48MP Pro Fusion (5x Optical)",
    },
    regular: {
      name: "iPhone 17",
      display: '6.1" Super Retina XDR',
      width: "71.6 mm",
      height: "147.6 mm",
      depth: "7.80 mm",
      weight: "170 g",
      chip: "A19",
      camera: "48MP Dual Fusion (2x Optical)",
    },
  };

  return (
    <section className="size-comparison">
      <div className="container">
        <h2 className="section-title-adv">Choose your size.</h2>
        <p className="section-subtitle-adv">
          Compare dimensions, weights, and displays across the line-up. Built from precision aluminium unibody.
        </p>

        <div className="comparison-interactive">
          <div className="size-stage-container">
            <div className="phones-visual">
              <div
                className={`phone-model model-pro-max ${
                  selectedModel === "pro-max" ? "active" : ""
                }`}
                onClick={() => setSelectedModel("pro-max")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedModel("pro-max");
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select iPhone 17 Pro Max 6.9 inch"
              >
                <div className="phone-antenna antenna-top"></div>
                <div className="phone-antenna antenna-side"></div>
                <div className="phone-frame">
                  <div className="dynamic-island-mini">
                    <span className="camera-dot"></span>
                  </div>
                  <div className="screen-inner-content">
                    <div className="screen-label">6.9″</div>
                    <div className="screen-model-tag">Pro Max</div>
                    <div className="screen-weight-tag">221g</div>
                  </div>
                </div>
                <div className="phone-reflection"></div>
              </div>

              <div
                className={`phone-model model-pro ${
                  selectedModel === "pro" ? "active" : ""
                }`}
                onClick={() => setSelectedModel("pro")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedModel("pro");
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select iPhone 17 Pro 6.3 inch"
              >
                <div className="phone-antenna antenna-top"></div>
                <div className="phone-antenna antenna-side"></div>
                <div className="phone-frame">
                  <div className="dynamic-island-mini">
                    <span className="camera-dot"></span>
                  </div>
                  <div className="screen-inner-content">
                    <div className="screen-label">6.3″</div>
                    <div className="screen-model-tag">Pro</div>
                    <div className="screen-weight-tag">199g</div>
                  </div>
                </div>
                <div className="phone-reflection"></div>
              </div>

              <div
                className={`phone-model model-regular ${
                  selectedModel === "regular" ? "active" : ""
                }`}
                onClick={() => setSelectedModel("regular")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedModel("regular");
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select iPhone 17 6.1 inch"
              >
                <div className="phone-antenna antenna-top"></div>
                <div className="phone-antenna antenna-side"></div>
                <div className="phone-frame">
                  <div className="dynamic-island-mini">
                    <span className="camera-dot"></span>
                  </div>
                  <div className="screen-inner-content">
                    <div className="screen-label">6.1″</div>
                    <div className="screen-model-tag">iPhone 17</div>
                    <div className="screen-weight-tag">170g</div>
                  </div>
                </div>
                <div className="phone-reflection"></div>
              </div>
            </div>

            {/* Pedestal platform */}
            <div className="pedestal-platform">
              <div className="pedestal-line"></div>
              <div className="pedestal-base"></div>
              <div className="pedestal-label">
                Scale comparison • Precision-machined aluminium unibody
              </div>
            </div>
          </div>

          <div className="model-selector">
            {Object.entries(models).map(([key, data]) => (
              <button
                key={key}
                type="button"
                className={`model-btn ${
                  selectedModel === key ? "active" : ""
                }`}
                onClick={() => setSelectedModel(key)}
              >
                <div className="model-name">{data.name}</div>
                <div className="model-specs">
                  <span>{data.display}</span>
                  <span>·</span>
                  <span>{data.height}</span>
                  <span>·</span>
                  <span>{data.weight}</span>
                  <span>·</span>
                  <span>{data.chip}</span>
                </div>
                <div className="model-camera-spec">{data.camera}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 3. MAGSAFE ACCESSORIES INTERACTIVE */
export function MagSafeInteractive() {
  const [selectedAccessory, setSelectedAccessory] = useState("charger");
  const [isSnapped, setIsSnapped] = useState(true);
  const [accessoryColor, setAccessoryColor] = useState("#e26620"); // Cosmic Orange default

  const ACCESSORY_COLORS = [
    { name: "Cosmic Orange", hex: "#e26620", colorIndex: 0 },
    { name: "Deep Navy", hex: "#202e3e", colorIndex: 4 },
    { name: "Silver", hex: "#d6d8db", colorIndex: 3 },
    { name: "Natural", hex: "#c9bfae", colorIndex: 1 },
  ];

  const accessories = {
    wallet: {
      name: "MagSafe FineWoven Wallet",
      price: "$59",
      desc: "Crafted from durable microtwill with Find My support. Holds up to 3 cards securely shielded from magnetic degaussing.",
      feature: "Find My & Shielded Cards",
      Icon: CreditCard,
    },
    battery: {
      name: "MagSafe Battery Pack",
      price: "$99",
      desc: "Attaches with perfectly aligned magnets for high-density power. Live charge status appears seamlessly in Dynamic Island.",
      feature: "Dynamic Island Power Status",
      Icon: Battery,
    },
    charger: {
      name: "25W MagSafe Fast Charger",
      price: "$39",
      desc: "Delivers up to 25W Qi2 wireless fast charging. Charges iPhone 17 Pro Max up to 50% in approximately 30 minutes with a 30W adapter.",
      feature: "Up to 25W Qi2 Fast Wireless",
      Icon: Zap,
    },
    stand: {
      name: "MagSafe StandBy Dock",
      price: "$79",
      desc: "Precision aluminium desk and bedside mount that automatically activates full-screen StandBy clock and widgets.",
      feature: "Auto StandBy Mode Activation",
      Icon: Smartphone,
    },
  };

  const activeItem = accessories[selectedAccessory];
  const ActiveIcon = activeItem.Icon;

  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const chassisMatRef = useRef(null);
  const plateauMatRef = useRef(null);

  const handleColorChange = (c) => {
    setAccessoryColor(c.hex);
    if (chassisMatRef.current && plateauMatRef.current && COLORS[c.colorIndex]) {
      chassisMatRef.current.color.set(COLORS[c.colorIndex].body);
      plateauMatRef.current.color.set(COLORS[c.colorIndex].plateau);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 280;
    const height = 540;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 50);
    camera.position.set(0, 0, 11.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 7-Point balanced studio lighting identical to Phase 3
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ec, 3.5);
    keyLight.position.set(-3.5, 5.5, 6.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdce8f8, 1.8);
    fillLight.position.set(4.5, 2.0, 5.5);
    scene.add(fillLight);

    const leftRim = new THREE.DirectionalLight(0xff9e5e, 3.8);
    leftRim.position.set(-8.0, 0.5, 0);
    scene.add(leftRim);

    const rightRim = new THREE.DirectionalLight(0xffaa6e, 3.8);
    rightRim.position.set(8.0, 0.5, 0);
    scene.add(rightRim);

    const topLight = new THREE.DirectionalLight(0xffffff, 2.0);
    topLight.position.set(0, 8.0, 0.5);
    scene.add(topLight);

    // Realistic Soft Ground Pedestal Shadow under phone on white surface
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext("2d");
    const shadowGrad = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.22)");
    shadowGrad.addColorStop(0.35, "rgba(0, 0, 0, 0.10)");
    shadowGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.03)");
    shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    shadowCtx.fillStyle = shadowGrad;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 1.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.position.set(0, -2.75, 0);
    shadowPlane.rotation.x = -Math.PI / 2;
    scene.add(shadowPlane);

    // Instantiate the approved Phase 3 iPhone 17 Pro Max 3D model in Cosmic Orange
    const { phoneGroup, chassisMat, plateauMat } = createPhase3IPhoneGroup(COLORS[0], {
      onWallpaperLoaded: () => {
        renderer.render(scene, camera);
      },
    });
    chassisMatRef.current = chassisMat;
    plateauMatRef.current = plateauMat;

    // Face the back towards the camera so MagSafe attachments snap to the rear
    phoneGroup.rotation.set(0, Math.PI, 0);
    scene.add(phoneGroup);

    let animId;
    const targetRot = { x: 0, y: Math.PI };
    const currentRot = { x: 0, y: Math.PI };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRot.x = -y * 0.08;
      targetRot.y = Math.PI + x * 0.12;
    };

    const handleMouseLeave = () => {
      targetRot.x = 0;
      targetRot.y = Math.PI;
    };

    const stageElem = stageRef.current;
    if (stageElem) {
      stageElem.addEventListener("mousemove", handleMouseMove);
      stageElem.addEventListener("mouseleave", handleMouseLeave);
    }

    let isVisible = true;
    let observer = null;
    if (typeof IntersectionObserver !== "undefined" && stageElem) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.02 }
      );
      observer.observe(stageElem);
    }

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      currentRot.x += (targetRot.x - currentRot.x) * 0.08;
      currentRot.y += (targetRot.y - currentRot.y) * 0.08;
      phoneGroup.rotation.x = currentRot.x;
      phoneGroup.rotation.y = currentRot.y;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (observer) observer.disconnect();
      cancelAnimationFrame(animId);
      if (stageElem) {
        stageElem.removeEventListener("mousemove", handleMouseMove);
        stageElem.removeEventListener("mouseleave", handleMouseLeave);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <section className="magsafe-interactive">
      <div className="container">
        <h2 className="section-title-adv">MagSafe. Magnetic snap. Instant power.</h2>
        <p className="section-subtitle-adv">
          Precision magnets align seamlessly to the aluminium unibody of iPhone 17 Pro Max for faster wireless charging and versatile accessories.
        </p>

        <div className="magsafe-demo">
          {/* Interactive Phone & Magnetic Attachment View */}
          <div className="magsafe-phone-stage" ref={stageRef}>
            <div className="magsafe-phone" aria-label="iPhone 17 Pro Max MagSafe Stage">
              {/* Approved Phase 3 Three.js 3D Model WebGL Canvas */}
              <canvas
                ref={canvasRef}
                className="magsafe-3d-canvas"
                width={280}
                height={540}
              />

              {/* MagSafe Magnetic Array & Induction Coil */}
              <div className={`magnetic-array ${isSnapped ? "snapped" : ""}`}>
                {/* Copper Induction Coil concentric rings */}
                <div className="coil-concentric-rings">
                  <span className="coil-circle c1" />
                  <span className="coil-circle c2" />
                  <span className="coil-circle c3" />
                </div>

                {/* Segmented Magnet Circle */}
                <div className="magnetic-dash-ring">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      className="magnet-segment-dash"
                      style={{ transform: `rotate(${i * 20}deg) translateY(-58px)` }}
                    />
                  ))}
                </div>

                {/* Alignment Bar Stem at 6 o'clock */}
                <div className="magsafe-alignment-stem" />

                {/* Active Magnetic Snap Pulse */}
                {isSnapped && <div className="snap-magnetic-pulse-glow" />}
              </div>

              {/* Attached / Snapped Accessory */}
              <div
                className={`snapped-accessory accessory-${selectedAccessory} ${isSnapped ? "attached" : "detached"}`}
                style={selectedAccessory === "charger" ? {} : { backgroundColor: accessoryColor }}
                onClick={() => setIsSnapped(!isSnapped)}
                title="Click to snap or detach"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsSnapped(!isSnapped);
                  }
                }}
              >
                {/* Accessory-specific realistic detailing */}
                {selectedAccessory === "charger" && (
                  <div className="charger-facets">
                    <div className="charger-puck-surface">
                      <svg className="charger-apple-logo" viewBox="0 0 24 24" width="36" height="36" fill="#8e8e93" aria-label="Apple MagSafe Logo">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <div className="charger-cable-stem" />
                  </div>
                )}
                {selectedAccessory === "wallet" && (
                  <div className="wallet-facets">
                    <div className="wallet-card-notch" />
                    <div className="wallet-perimeter-stitch" />
                    <div className="accessory-icon-large">
                      <ActiveIcon size={28} />
                    </div>
                    <div className="accessory-snap-label">{activeItem.name}</div>
                  </div>
                )}
                {selectedAccessory === "battery" && (
                  <div className="battery-facets">
                    <div className={`battery-status-led ${isSnapped ? "active" : ""}`} />
                    <div className="battery-connector-notch" />
                    <div className="accessory-icon-large">
                      <ActiveIcon size={28} />
                    </div>
                    <div className="accessory-snap-label">{activeItem.name}</div>
                    {isSnapped && <div className="snap-charging-pulse">⚡ 100% Full</div>}
                  </div>
                )}
                {selectedAccessory === "stand" && (
                  <div className="stand-facets">
                    <div className="stand-hinge-accent" />
                    <div className="stand-cantilever-neck" />
                    <div className="accessory-icon-large">
                      <ActiveIcon size={28} />
                    </div>
                    <div className="accessory-snap-label">{activeItem.name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="magsafe-stage-controls">
              <button
                type="button"
                className="snap-toggle-btn"
                onClick={() => setIsSnapped(!isSnapped)}
              >
                {isSnapped ? "Detach Accessory" : "Snap to iPhone"}
              </button>

              <div className="accessory-color-swatches">
                <span className="swatch-hint">Color:</span>
                {ACCESSORY_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`magsafe-swatch ${accessoryColor === c.hex ? "active" : ""}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => handleColorChange(c)}
                    aria-label={`Select ${c.name}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Accessory Selector Cards */}
          <div className="accessory-cards">
            {Object.entries(accessories).map(([key, item]) => {
              const AccessoryIcon = item.Icon;
              const isSelected = selectedAccessory === key;
              return (
                <div
                  key={key}
                  className={`accessory-card ${isSelected ? "active" : ""}`}
                  onClick={() => {
                    setSelectedAccessory(key);
                    setIsSnapped(true);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedAccessory(key);
                      setIsSnapped(true);
                    }
                  }}
                >
                  <div className="card-top-row">
                    <div className="accessory-icon-small">
                      <AccessoryIcon size={ICON_SIZE_SM} />
                    </div>
                    <span className="accessory-price">{item.price}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p className="accessory-desc">{item.desc}</p>
                  <div className="accessory-feature-badge">{item.feature}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 4. INTERACTIVE FEATURE EXPLORER */
export function FeatureExplorer() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: "display",
      title: "Always-On Display & ProMotion",
      tag: "Super Retina XDR",
      desc: "The Lock Screen intelligently dims while staying readable, refreshing down to 1Hz to conserve energy while keeping time, widgets, and Live Activities in sight.",
      stat: "1Hz to 120Hz",
      statLabel: "Adaptive ProMotion Refresh",
      Icon: Smartphone,
      accent: "#e26620",
      image: process.env.PUBLIC_URL + "/Images/pic5.jpg",
      subfeatures: ["Intelligent ambient dimming", "StandBy full-screen experience", "Dynamic Island integration"]
    },
    {
      id: "satellite",
      title: "Emergency SOS via Satellite",
      tag: "Satellite Connectivity",
      desc: "Connect to low-Earth orbit satellites when cellular and Wi-Fi coverage are unavailable to text emergency services, dispatch roadside assistance, or update Find My location.",
      stat: "15-Second",
      statLabel: "Average Satellite Link Time",
      Icon: Satellite,
      accent: "#2997ff",
      image: process.env.PUBLIC_URL + "/Images/file7.jpg",
      subfeatures: ["Roadside Assistance via Satellite", "Find My satellite location sharing", "Emergency medical ID relay"]
    },
    {
      id: "crash",
      title: "Crash Detection",
      tag: "Vital Safety Architecture",
      desc: "Dual high-g accelerometer and high dynamic range gyroscope detect severe cabin pressure shifts and extreme g-forces up to 256G, automatically calling emergency responders.",
      stat: "256G",
      statLabel: "Extreme G-Force Sampling",
      Icon: Car,
      accent: "#ff3b30",
      image: process.env.PUBLIC_URL + "/Images/pic4.jpg",
      subfeatures: ["Microphone sound spike analysis", "Barometer cabin pressure sensor", "Automated emergency dispatch"]
    },
    {
      id: "water",
      title: "Industry-Leading Water Resistance",
      tag: "Precision Gasket Sealing",
      desc: "Precision unibody gaskets and acoustic mesh resist water immersion up to a maximum depth of 6 metres for up to 30 minutes, tested under rigorous IEC standard 60529.",
      stat: "6 Metres",
      statLabel: "Tested Depth for 30 Minutes",
      Icon: Droplets,
      accent: "#30d158",
      image: process.env.PUBLIC_URL + "/Images/p3.jpg",
      subfeatures: ["Rated IP68 under IEC standard 60529", "Coffee, tea, and soda spill resistant", "Sub-micron sealed acoustic ports"]
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [features.length]);

  const current = features[activeFeature];
  const CurrentIcon = current.Icon;

  return (
    <section className="feature-explorer">
      <div className="container">
        <h2 className="section-title-adv">Designed to make a difference.</h2>
        <p className="section-subtitle-adv">
          Advanced safety engineering, low-Earth orbit satellite communications, and rugged durability designed to protect you every day.
        </p>

        <div className="explorer-wrapper">
          {/* Substantial Feature Visual Stage */}
          <div className="feature-showcase-stage" style={{ "--feature-accent": current.accent }}>
            <div className="feature-stage-backdrop">
              <img
                src={current.image}
                alt={current.title}
                className="feature-stage-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = process.env.PUBLIC_URL + "/Images/p1.jpg";
                }}
              />
              <div className="feature-stage-gradient" />
            </div>

            <div className="feature-stage-body">
              <div className="feature-top-meta">
                <div className="feature-radar-circle">
                  <span className="radar-ring ring-1" />
                  <span className="radar-ring ring-2" />
                  <div className="feature-icon-core">
                    <CurrentIcon size={32} />
                  </div>
                </div>

                <div className="feature-stat-box">
                  <div className="feature-stat-value">{current.stat}</div>
                  <div className="feature-stat-label">{current.statLabel}</div>
                </div>
              </div>

              <div className="feature-text-content">
                <span className="feature-tag-badge">{current.tag}</span>
                <h3 className="feature-hero-title">{current.title}</h3>
                <p className="feature-hero-desc">{current.desc}</p>
                <ul className="feature-sublist">
                  {current.subfeatures.map((sub, idx) => (
                    <li key={idx}>
                      <Check size={14} className="sublist-check" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Feature Nav Cards */}
          <div className="feature-nav-list" role="tablist" aria-label="Key iPhone 17 Pro Max Features">
            {features.map((feature, index) => {
              const FeatureIcon = feature.Icon;
              const isSelected = index === activeFeature;

              return (
                <button
                  key={feature.id}
                  type="button"
                  className={`feature-nav-card ${isSelected ? "active" : ""}`}
                  onClick={() => setActiveFeature(index)}
                  role="tab"
                  aria-selected={isSelected}
                  style={{ "--card-accent": feature.accent }}
                >
                  <div className="nav-card-left">
                    <div className="nav-card-icon">
                      <FeatureIcon size={20} />
                    </div>
                  </div>

                  <div className="nav-card-center">
                    <div className="nav-card-tag">{feature.tag}</div>
                    <div className="nav-card-title">{feature.title}</div>
                  </div>

                  <div className="nav-card-right">
                    <div className="nav-card-indicator" />
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
