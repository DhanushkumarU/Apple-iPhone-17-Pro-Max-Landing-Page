import React, { useState, useEffect } from "react";
import {
  Clock,
  Clapperboard,
  Headphones,
  Home,
  Laptop,
  Lock,
  MapPin,
  Moon,
  Mountain,
  Music,
  Phone,
  Plus,
  ScanSearch,
  Smartphone,
  Sparkles,
  Star,
  Play,
  Pause,
  Timer,
  User,
  Watch,
  Check,
  ShoppingBag,
  ShieldCheck,
  Cpu,
  Pencil,
  Wand2,
  Smile,
  Eye,
} from "lucide-react";
import "./NewComponents.css";

const ICON_SIZE = 28;

// 1. SCROLLING COLOR CAROUSEL
export function ColorCarousel() {
  const colors = [
    { name: "Cosmic Orange Aluminium", hex: "#e26620", gradient: "linear-gradient(135deg, #e26620 0%, #f4863c 100%)" },
    { name: "Deep Blue Aluminium", hex: "#22354c", gradient: "linear-gradient(135deg, #22354c 0%, #416086 100%)" },
    { name: "Silver Aluminium", hex: "#e6e7ea", gradient: "linear-gradient(135deg, #e6e7ea 0%, #ffffff 100%)" },
    { name: "Natural Aluminium", hex: "#9c9790", gradient: "linear-gradient(135deg, #9c9790 0%, #bfbab2 100%)" },
    { name: "Space Black Aluminium", hex: "#1c1c1f", gradient: "linear-gradient(135deg, #1c1c1f 0%, #2c2c2e 100%)" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % colors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [colors.length]);

  return (
    <section className="color-carousel-section">
      <div className="container">
        <h2 className="section-title-new">Available in five precision finishes, led by Cosmic Orange.</h2>
        <div className="color-showcase">
          <div className="color-display" style={{ background: colors[activeIndex].gradient }}>
            <div className="color-name-overlay">{colors[activeIndex].name}</div>
          </div>
          <div className="color-dots">
            {colors.map((color, index) => (
              <button
                key={color.name}
                className={`color-dot-btn ${index === activeIndex ? "active" : ""}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setActiveIndex(index)}
                aria-label={`Select ${color.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. DYNAMIC ISLAND FEATURE
export function DynamicIslandFeature() {
  const [expanded, setExpanded] = useState(true);
  const [activeMode, setActiveMode] = useState("music"); // 'music' | 'calls' | 'timer' | 'maps' | 'translate'
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(899); // 14:59

  useEffect(() => {
    let interval = null;
    if (activeMode === "timer" && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeMode, timerSeconds]);

  const formatTimer = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleSelectMode = (mode) => {
    setActiveMode(mode);
    setExpanded(true);
  };

  return (
    <section className="dynamic-island-section">
      <div className="container">
        <h2 className="section-title-new">Dynamic Island. Fluid, tactile, and proactive.</h2>
        <p className="section-subtitle-new">
          The Dynamic Island bubbles up alerts and Live Activities seamlessly. Tap any activity below or click the Island to see it expand in real time.
        </p>

        <div className="island-demo">
          <div 
            className={`island-pill ${expanded ? "expanded" : ""} mode-${activeMode}`}
            onClick={() => setExpanded(!expanded)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded((prev) => !prev);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Toggle Dynamic Island expansion"
          >
            {!expanded ? (
              <div className="island-compact">
                <div className="compact-left">
                  {activeMode === "music" && <Music size={14} className="compact-icon icon-music" />}
                  {activeMode === "calls" && <Phone size={14} className="compact-icon icon-call" />}
                  {activeMode === "timer" && <Timer size={14} className="compact-icon icon-timer" />}
                  {activeMode === "maps" && <MapPin size={14} className="compact-icon icon-maps" />}
                  {activeMode === "translate" && <Sparkles size={14} className="compact-icon icon-translate" />}
                </div>
                <div className="island-sensor-group">
                  <div className="island-camera-hole"></div>
                  <div className="island-mic-hole"></div>
                </div>
                <div className="compact-right">
                  {activeMode === "music" && (
                    <div className="compact-waveform">
                      <span className={`compact-wave ${isMusicPlaying ? "playing" : ""}`}></span>
                      <span className={`compact-wave ${isMusicPlaying ? "playing" : ""}`}></span>
                      <span className={`compact-wave ${isMusicPlaying ? "playing" : ""}`}></span>
                    </div>
                  )}
                  {activeMode === "calls" && <span className="compact-badge-call">02:41</span>}
                  {activeMode === "timer" && <span className="compact-badge-timer">{formatTimer(timerSeconds)}</span>}
                  {activeMode === "maps" && <span className="compact-badge-maps">200m ↗</span>}
                  {activeMode === "translate" && <span className="compact-badge-translate">EN ↔ ES</span>}
                </div>
              </div>
            ) : (
              <div className="island-content">
                {activeMode === "music" && (
                  <div className="island-mode-view island-music-view">
                    <div className="island-art">
                      <Music size={24} />
                    </div>
                    <div className="island-info">
                      <div className="island-title">Starboy</div>
                      <div className="island-subtitle">The Weeknd — Starboy</div>
                      <div className="island-progress-track">
                        <div className="island-progress-fill" />
                      </div>
                      <div className="island-time-labels">
                        <span>2:14</span>
                        <span>-1:36</span>
                      </div>
                    </div>
                    <div className="island-music-controls">
                      <button
                        type="button"
                        className="island-ctrl-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMusicPlaying(!isMusicPlaying);
                        }}
                        aria-label={isMusicPlaying ? "Pause music" : "Play music"}
                      >
                        {isMusicPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <div className="island-waveform">
                        <div className={`wave ${isMusicPlaying ? "playing" : ""}`}></div>
                        <div className={`wave ${isMusicPlaying ? "playing" : ""}`}></div>
                        <div className={`wave ${isMusicPlaying ? "playing" : ""}`}></div>
                        <div className={`wave ${isMusicPlaying ? "playing" : ""}`}></div>
                        <div className={`wave ${isMusicPlaying ? "playing" : ""}`}></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeMode === "calls" && (
                  <div className="island-mode-view island-call-view">
                    <div className="island-caller-avatar">
                      <Phone size={20} />
                    </div>
                    <div className="island-info">
                      <div className="island-title">Sarah Jenkins</div>
                      <div className="island-subtitle call-status">iPhone Audio • 02:41</div>
                    </div>
                    <div className="island-call-actions">
                      <span className="call-btn-mini end-call">End</span>
                      <span className="call-btn-mini speaker-call">Speaker</span>
                    </div>
                  </div>
                )}

                {activeMode === "timer" && (
                  <div className="island-mode-view island-timer-view">
                    <div className="island-timer-badge">
                      <Timer size={22} />
                    </div>
                    <div className="island-info">
                      <div className="island-title">Oven Roast</div>
                      <div className="island-subtitle">Live Countdown</div>
                    </div>
                    <div className="island-timer-right">
                      <div className="island-timer-digits">{formatTimer(timerSeconds)}</div>
                      <span className="timer-pause-pill">Pause</span>
                    </div>
                  </div>
                )}

                {activeMode === "maps" && (
                  <div className="island-mode-view island-maps-view">
                    <div className="island-nav-arrow">↗</div>
                    <div className="island-info">
                      <div className="island-title">In 200 metres</div>
                      <div className="island-subtitle">Turn right on Regent St</div>
                    </div>
                    <div className="island-maps-badge">Route</div>
                  </div>
                )}

                {activeMode === "translate" && (
                  <div className="island-mode-view island-translate-view">
                    <div className="island-translate-badge">
                      <Sparkles size={20} />
                    </div>
                    <div className="island-info">
                      <div className="island-title">Apple Intelligence Translation</div>
                      <div className="island-subtitle">¿Dónde está la galería? ➔ Where is the gallery?</div>
                    </div>
                    <div className="island-translate-pill">Live</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="island-hint">
            {expanded ? "Tap Island to minimize" : "Tap Island to expand"}
          </p>
        </div>

        <div className="island-uses">
          <button 
            type="button"
            className={`use-card ${activeMode === "music" ? "active" : ""}`}
            onClick={() => handleSelectMode("music")}
          >
            <div className="use-icon">
              <Music size={ICON_SIZE} />
            </div>
            <p>Music</p>
          </button>
          <button 
            type="button"
            className={`use-card ${activeMode === "calls" ? "active" : ""}`}
            onClick={() => handleSelectMode("calls")}
          >
            <div className="use-icon">
              <Phone size={ICON_SIZE} />
            </div>
            <p>Calls</p>
          </button>
          <button 
            type="button"
            className={`use-card ${activeMode === "timer" ? "active" : ""}`}
            onClick={() => handleSelectMode("timer")}
          >
            <div className="use-icon">
              <Timer size={ICON_SIZE} />
            </div>
            <p>Timer</p>
          </button>
          <button 
            type="button"
            className={`use-card ${activeMode === "maps" ? "active" : ""}`}
            onClick={() => handleSelectMode("maps")}
          >
            <div className="use-icon">
              <MapPin size={ICON_SIZE} />
            </div>
            <p>Maps</p>
          </button>
          <button 
            type="button"
            className={`use-card ${activeMode === "translate" ? "active" : ""}`}
            onClick={() => handleSelectMode("translate")}
          >
            <div className="use-icon">
              <Sparkles size={ICON_SIZE} />
            </div>
            <p>Intelligence</p>
          </button>
        </div>
      </div>
    </section>
  );
}

// 3. APPLE INTELLIGENCE & PRIVACY STORYTELLING
export function PrivacySection() {
  const [activeTab, setActiveTab] = useState("writing");
  const [writingTone, setWritingTone] = useState("professional");
  const [isCleaned, setIsCleaned] = useState(false);
  const [activeGenmoji, setActiveGenmoji] = useState("astronaut");

  const writingSamples = {
    professional: {
      original: "Hey team, just checking if the project is ready yet because we need it soon.",
      rewritten: "Hello team, I wanted to follow up on the project status to ensure we remain aligned for our upcoming milestone delivery.",
      badge: "Professional Tone",
    },
    friendly: {
      original: "Hey team, just checking if the project is ready yet because we need it soon.",
      rewritten: "Hey team! Hope you're having a wonderful week. Quick check-in on the project whenever you have a moment!",
      badge: "Friendly Tone",
    },
    concise: {
      original: "Hey team, just checking if the project is ready yet because we need it soon.",
      rewritten: "Following up on the project status ahead of upcoming milestones.",
      badge: "Concise Tone",
    },
    summary: {
      original: "Hey team, just checking if the project is ready yet because we need it soon.",
      rewritten: "• Project milestone follow-up\n• Alignment on delivery timeline\n• Status verification requested",
      badge: "Smart Summary",
    },
  };

  const genmojiSamples = {
    astronaut: {
      prompt: "Astronaut chef making pizza on Mars",
      emoji: "🧑‍🚀🍕",
      title: "Mars Pizza Chef",
      category: "Genmoji",
    },
    shiba: {
      prompt: "Cyberpunk Shiba Inu with glowing neon sunglasses",
      emoji: "🐕‍🦺🕶️",
      title: "Neon Cyber Hound",
      category: "Image Playground",
    },
    sloth: {
      prompt: "Relaxing sloth meditating with iced matcha latte",
      emoji: "🦥🍵",
      title: "Zen Matcha Sloth",
      category: "Genmoji",
    },
    surfer: {
      prompt: "Cool cat riding a wave at golden hour sunset",
      emoji: "🏄🐱",
      title: "Sunset Wave Rider",
      category: "Image Playground",
    },
  };

  const aiTabs = [
    { id: "writing", name: "Writing Tools", Icon: Pencil, badge: "Systemwide" },
    { id: "cleanup", name: "Clean Up in Photos", Icon: Wand2, badge: "Generative" },
    { id: "genmoji", name: "Genmoji & Playground", Icon: Smile, badge: "Creative" },
    { id: "siri", name: "Siri Onscreen Awareness", Icon: Sparkles, badge: "Contextual" },
    { id: "privateCloud", name: "Private Cloud Compute", Icon: ShieldCheck, badge: "Breakthrough" },
  ];

  return (
    <section className="privacy-section" id="apple-intelligence" aria-label="Apple Intelligence and Privacy">
      <div className="container">
        <div className="ai-section-header">
          <div className="ai-eyebrow-badge">
            <Sparkles size={16} className="ai-eyebrow-icon" />
            <span>Apple Intelligence &amp; Privacy</span>
          </div>
          <h2 className="section-title-new">AI for the rest of us. Deeply integrated. Truly personal. Completely private.</h2>
          <p className="section-subtitle-new">
            Harnessing the revolutionary A19 Pro 16-core Neural Engine and pioneering Private Cloud Compute, Apple Intelligence delivers personal, powerful features that transform everyday moments — while setting the gold standard for user privacy.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="ai-tabs-container" role="tablist" aria-label="Apple Intelligence Features">
          {aiTabs.map((tab) => {
            const TabIcon = tab.Icon;
            return (
              <button
                key={tab.id}
                type="button"
                className={`ai-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <TabIcon size={18} />
                <span>{tab.name}</span>
                <span className="ai-tab-pill">{tab.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="ai-interactive-stage">
          {activeTab === "writing" && (
            <div className="ai-stage-panel ai-writing-panel">
              <div className="ai-panel-header">
                <div className="ai-panel-title-group">
                  <span className="ai-panel-tag">Writing Tools</span>
                  <h3>Refine, rewrite, and summarize instantly across your apps.</h3>
                  <p>Whether drafting an email, polishing a report, or crafting a reply, Writing Tools helps you find the right words in seconds.</p>
                </div>
                <div className="writing-tone-selector" role="group" aria-label="Select rewriting tone">
                  {Object.keys(writingSamples).map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      className={`tone-btn ${writingTone === tone ? "active" : ""}`}
                      onClick={() => setWritingTone(tone)}
                    >
                      {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="writing-comparison-card">
                <div className="writing-box original">
                  <div className="writing-box-label">Original Draft</div>
                  <p className="writing-text">"{writingSamples[writingTone].original}"</p>
                </div>
                <div className="writing-arrow">➔</div>
                <div className="writing-box refined">
                  <div className="writing-box-header">
                    <span className="writing-box-label highlight">Rewritten with Apple Intelligence</span>
                    <span className="writing-chip-badge">{writingSamples[writingTone].badge}</span>
                  </div>
                  <p className="writing-text highlighted">
                    {writingSamples[writingTone].rewritten.split("\n").map((line, idx) => (
                      <span key={idx} className="summary-line">{line}<br /></span>
                    ))}
                  </p>
                  <div className="writing-footer-meta">
                    <Check size={14} className="meta-icon" />
                    <span>Processed 100% on-device by A19 Pro Neural Engine</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cleanup" && (
            <div className="ai-stage-panel ai-cleanup-panel">
              <div className="ai-panel-header">
                <div className="ai-panel-title-group">
                  <span className="ai-panel-tag">Clean Up in Photos</span>
                  <h3>Erase unwanted distractions with a single tap.</h3>
                  <p>Identify and remove background photobombers and clutter seamlessly while preserving the natural lighting, shadows, and textures of your shot.</p>
                </div>
                <button
                  type="button"
                  className={`cleanup-action-btn ${isCleaned ? "cleaned" : ""}`}
                  onClick={() => setIsCleaned(!isCleaned)}
                >
                  <Wand2 size={16} />
                  <span>{isCleaned ? "Show Original Distraction" : "Tap to Clean Up Distraction"}</span>
                </button>
              </div>

              <div className="cleanup-visual-stage">
                <div className="cleanup-image-container">
                  <img
                    src={process.env.PUBLIC_URL + "/Images/pic1.jpg"}
                    alt="Clean Up in Photos demonstration"
                    className="cleanup-base-image"
                  />
                  {!isCleaned ? (
                    <div className="cleanup-distraction-overlay" onClick={() => setIsCleaned(true)}>
                      <div className="distraction-reticle">
                        <span className="reticle-pulse"></span>
                        <span className="reticle-label">Unwanted Distraction • Tap to erase</span>
                      </div>
                    </div>
                  ) : (
                    <div className="cleanup-success-pill">
                      <Sparkles size={16} />
                      <span>Distraction seamlessly removed via generative inpainting</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "genmoji" && (
            <div className="ai-stage-panel ai-genmoji-panel">
              <div className="ai-panel-header">
                <div className="ai-panel-title-group">
                  <span className="ai-panel-tag">Genmoji &amp; Image Playground</span>
                  <h3>Express yourself with custom on-device creations.</h3>
                  <p>Generate brand-new emojis directly from the keyboard or explore stylized illustrations and sketches in seconds.</p>
                </div>
                <div className="genmoji-prompt-chips">
                  {Object.entries(genmojiSamples).map(([key, sample]) => (
                    <button
                      key={key}
                      type="button"
                      className={`prompt-chip ${activeGenmoji === key ? "active" : ""}`}
                      onClick={() => setActiveGenmoji(key)}
                    >
                      <span>{sample.emoji}</span>
                      <span>{sample.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="genmoji-display-stage">
                <div className="genmoji-prompt-input-bubble">
                  <span className="input-sparkle">✨</span>
                  <span className="input-text">{genmojiSamples[activeGenmoji].prompt}</span>
                  <span className="input-generate-pill">Created</span>
                </div>
                <div className="genmoji-rendered-card">
                  <div className="genmoji-art-display">
                    <span className="genmoji-symbol">{genmojiSamples[activeGenmoji].emoji}</span>
                  </div>
                  <div className="genmoji-info-box">
                    <h4>{genmojiSamples[activeGenmoji].title}</h4>
                    <span className="genmoji-type-tag">{genmojiSamples[activeGenmoji].category}</span>
                    <p>Generated locally in milliseconds on iPhone 17 Pro Max with zero server latency.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "siri" && (
            <div className="ai-stage-panel ai-siri-panel">
              <div className="ai-panel-header">
                <div className="ai-panel-title-group">
                  <span className="ai-panel-tag">Siri with Onscreen Awareness</span>
                  <h3>More natural, more capable, deeply personal.</h3>
                  <p>With onscreen awareness and deep semantic indexing across your photos, notes, and messages, Siri understands personal context like never before.</p>
                </div>
              </div>

              <div className="siri-phone-showcase">
                <div className="siri-phone-frame">
                  <div className="siri-glow-border"></div>
                  <div className="siri-screen-content">
                    <div className="siri-conversation">
                      <div className="siri-bubble user">
                        <p>"When does Mom's flight land and what's our dinner reservation tonight?"</p>
                      </div>
                      <div className="siri-bubble siri-reply">
                        <div className="siri-reply-header">
                          <Sparkles size={16} className="siri-spark-icon" />
                          <span>Siri • Personal Context</span>
                        </div>
                        <p>
                          "Flight <strong>DL 412</strong> from Seattle is on time, touching down at <strong>6:45 PM</strong> at Terminal 4. Traffic to <em>Bistro Belle</em> is 32 minutes, giving you 15 minutes before your <strong>7:30 PM</strong> reservation."
                        </p>
                        <div className="siri-sources-row">
                          <span className="source-pill">Mail • Delta Flight DL412</span>
                          <span className="source-pill">OpenTable • Reservation Confirmation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privateCloud" && (
            <div className="ai-stage-panel ai-pcc-panel">
              <div className="ai-panel-header">
                <div className="ai-panel-title-group">
                  <span className="ai-panel-tag">Private Cloud Compute</span>
                  <h3>An extraordinary privacy breakthrough for AI.</h3>
                  <p>When complex requests require server intelligence, Private Cloud Compute draws on custom Apple Silicon servers designed with verified privacy that never retains your data.</p>
                </div>
              </div>

              <div className="pcc-architecture-grid">
                <div className="pcc-step-card">
                  <div className="pcc-step-badge">Level 1</div>
                  <div className="pcc-step-icon"><Cpu size={28} /></div>
                  <h4>On-Device Neural Engine</h4>
                  <p>Most tasks run entirely on your iPhone 17 Pro Max via the 35 TOPS A19 Pro Neural Engine. Your data never leaves your device.</p>
                </div>
                <div className="pcc-step-arrow">➔</div>
                <div className="pcc-step-card highlight">
                  <div className="pcc-step-badge primary">Level 2</div>
                  <div className="pcc-step-icon"><ShieldCheck size={28} /></div>
                  <h4>Private Cloud Compute</h4>
                  <p>For heavier foundational models, requests route securely to Apple Silicon servers. Data is processed in memory and never persistently saved.</p>
                </div>
                <div className="pcc-step-arrow">➔</div>
                <div className="pcc-step-card">
                  <div className="pcc-step-badge">Level 3</div>
                  <div className="pcc-step-icon"><Lock size={28} /></div>
                  <h4>Verifiable Transparency</h4>
                  <p>Independent security researchers can inspect the software images running on Apple servers to cryptographically verify privacy guarantees.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4 Pillars of Privacy */}
        <div className="privacy-grid">
          <div className="privacy-card">
            <div className="privacy-icon">
              <Cpu size={ICON_SIZE} />
            </div>
            <h3>On-Device Intelligence</h3>
            <p>A19 Pro powers high-speed machine learning models locally without transmitting your personal data.</p>
          </div>
          <div className="privacy-card">
            <div className="privacy-icon">
              <ShieldCheck size={ICON_SIZE} />
            </div>
            <h3>Private Cloud Compute</h3>
            <p>Expands computational limits to server models while strictly guaranteeing your data is never stored or logged.</p>
          </div>
          <div className="privacy-card">
            <div className="privacy-icon">
              <Eye size={ICON_SIZE} />
            </div>
            <h3>Granular Onscreen Awareness</h3>
            <p>Understands what's on your screen to assist you in real time without cataloging your personal library.</p>
          </div>
          <div className="privacy-card">
            <div className="privacy-icon">
              <Lock size={ICON_SIZE} />
            </div>
            <h3>Zero Data Monetization</h3>
            <p>Apple does not build profiles of your life or sell your queries. Your privacy is a fundamental human right.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export const AppleIntelligenceSection = PrivacySection;

// 4. CAMERA MODES SLIDER
export function CameraModesSlider() {
  const modes = [
    { 
      name: "Portrait", 
      Icon: User, 
      desc: "Studio-quality portraits with next-generation depth control and focal point switching.",
      image: process.env.PUBLIC_URL + "/Images/p3.jpg",
      specs: "48MP Main • ƒ/1.78 • 24mm"
    },
    { 
      name: "Night", 
      Icon: Moon, 
      desc: "Incredible low-light captures with Photonic Engine and LiDAR assistance.",
      image: process.env.PUBLIC_URL + "/Images/cam1.jpg",
      specs: "Night Mode 2.5s • Deep Fusion"
    },
    { 
      name: "Cinematic", 
      Icon: Clapperboard, 
      desc: "Cinema-grade 4K Dolby Vision with automatic rack focus and shallow depth of field.",
      image: process.env.PUBLIC_URL + "/Images/pic1.jpg",
      specs: "4K HDR at 30 fps • Dolby Vision"
    },
    { 
      name: "Macro", 
      Icon: ScanSearch, 
      desc: "Microscopic sharpness down to 2cm with the ultra-wide 48MP autofocus system.",
      image: process.env.PUBLIC_URL + "/Images/pic3.jpg",
      specs: "48MP Ultra Wide • ƒ/2.2 • 13mm"
    },
    { 
      name: "Panorama", 
      Icon: Mountain, 
      desc: "Up to 63MP ultra-wide panoramic captures with zero geometric distortion.",
      image: process.env.PUBLIC_URL + "/Images/file7.jpg",
      specs: "63MP Pano • Smart HDR"
    },
    { 
      name: "Action", 
      Icon: Clock, 
      desc: "Super-smooth handheld stabilization and mesmerizing hyper-lapse sequences.",
      image: process.env.PUBLIC_URL + "/Images/cam3.jpg",
      specs: "Action Mode 2.8K 60 fps • OIS"
    },
  ];

  const [activeMode, setActiveMode] = useState(0);

  return (
    <section className="camera-modes-section">
      <div className="container">
        <h2 className="section-title-new">Powerful camera modes for every moment.</h2>
        <p className="section-subtitle-new">
          Engineered for the 48MP Pro Fusion camera system. Switch modes to explore real-time viewfinder captures.
        </p>
        <div className="modes-slider">
          <div className="modes-preview-viewport">
            <div className="modes-preview-img-wrapper">
              <img 
                src={modes[activeMode].image} 
                alt={`iPhone 17 Pro Max ${modes[activeMode].name} camera mode preview`} 
                className="modes-preview-img"
                loading="lazy"
                decoding="async"
              />
              <div className="modes-viewfinder-hud">
                <div className="hud-top">
                  <span className="hud-badge">{modes[activeMode].name.toUpperCase()}</span>
                  <span className="hud-spec-tag">{modes[activeMode].specs}</span>
                </div>
                <div className="hud-reticle">
                  <div className="hud-bracket top-left"></div>
                  <div className="hud-bracket top-right"></div>
                  <div className="hud-bracket bottom-left"></div>
                  <div className="hud-bracket bottom-right"></div>
                </div>
                <div className="hud-bottom">
                  <div className="hud-desc">{modes[activeMode].desc}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Refined Camera Mode Control Strip */}
          <div className="camera-mode-strip-wrap" role="tablist" aria-label="Camera Modes Selector">
            <div className="camera-mode-strip">
              {modes.map((mode, index) => {
                const ModeIcon = mode.Icon;
                const isActive = index === activeMode;
                return (
                  <button
                    key={mode.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`camera-mode-pill ${isActive ? "active" : ""}`}
                    onClick={() => setActiveMode(index)}
                  >
                    <span className="mode-pill-icon" aria-hidden="true">
                      <ModeIcon size={14} strokeWidth={isActive ? 2.2 : 1.75} />
                    </span>
                    <span className="mode-pill-label">{mode.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CONTINUITY HARDWARE VECTOR VISUALS
function MacBookContinuityVisual() {
  return (
    <div className="continuity-device-frame macbook-frame">
      <svg
        viewBox="0 0 260 170"
        className="continuity-device-svg macbook-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="MacBook Pro with macOS iPhone Mirroring"
      >
        <defs>
          <linearGradient id="macBezel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1e24" />
            <stop offset="100%" stopColor="#0c0d10" />
          </linearGradient>
          <linearGradient id="macScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14213d" />
            <stop offset="50%" stopColor="#1f3160" />
            <stop offset="100%" stopColor="#0c111e" />
          </linearGradient>
          <linearGradient id="macBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e3e8" />
            <stop offset="50%" stopColor="#c8c9ce" />
            <stop offset="100%" stopColor="#a8a9ad" />
          </linearGradient>
          <linearGradient id="macLip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a7b80" />
            <stop offset="100%" stopColor="#5a5b60" />
          </linearGradient>
          <linearGradient id="mirrorWindow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1e26" />
            <stop offset="100%" stopColor="#0e0e14" />
          </linearGradient>
        </defs>

        {/* MacBook Display Lid */}
        <rect x="25" y="10" width="210" height="130" rx="9" fill="url(#macBezel)" stroke="#3a3a44" strokeWidth="1.5" />
        <rect x="30" y="15" width="200" height="120" rx="5" fill="#000000" />
        <rect x="33" y="18" width="194" height="114" rx="3" fill="url(#macScreen)" />

        {/* Display Notch */}
        <path d="M 122 18 L 138 18 L 137 23 L 123 23 Z" fill="#000000" />
        <circle cx="130" cy="20.5" r="1.2" fill="#1b4d3e" />

        {/* macOS Menu bar */}
        <rect x="33" y="18" width="194" height="6" fill="rgba(255,255,255,0.12)" />
        <circle cx="38" cy="21" r="1.2" fill="#ffffff" opacity="0.8" />
        <rect x="42" y="20" width="12" height="2" rx="1" fill="#ffffff" opacity="0.6" />
        <rect x="58" y="20" width="10" height="2" rx="1" fill="#ffffff" opacity="0.6" />

        {/* Live iPhone Mirroring Window on Mac display */}
        <g transform="translate(138, 26)">
          <rect x="0" y="0" width="46" height="92" rx="8" fill="url(#mirrorWindow)" stroke="#e26620" strokeWidth="1" />
          <rect x="0" y="0" width="46" height="10" rx="8" fill="#181820" />
          <circle cx="5" cy="5" r="1.5" fill="#ff5f56" />
          <circle cx="9.5" cy="5" r="1.5" fill="#ffbd2e" />
          <circle cx="14" cy="5" r="1.5" fill="#27c93f" />
          <text x="28" y="7" fontSize="4.5" fill="#ffffff" opacity="0.8" textAnchor="middle" fontFamily="sans-serif">iPhone</text>

          {/* Dynamic Island on mirror */}
          <rect x="16" y="12" width="14" height="3" rx="1.5" fill="#000000" />
          <text x="23" y="24" fontSize="6.5" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">9:41</text>
          <text x="23" y="30" fontSize="3.5" fill="#e26620" textAnchor="middle" fontFamily="sans-serif">Mirroring</text>

          {/* Mirrored app grid */}
          <rect x="5" y="36" width="7" height="7" rx="2" fill="#0071e3" />
          <rect x="15" y="36" width="7" height="7" rx="2" fill="#34c759" />
          <rect x="25" y="36" width="7" height="7" rx="2" fill="#e26620" />
          <rect x="35" y="36" width="7" height="7" rx="2" fill="#af52de" />
          <rect x="5" y="46" width="7" height="7" rx="2" fill="#ff9500" />
          <rect x="15" y="46" width="7" height="7" rx="2" fill="#ff2d55" />
          <rect x="25" y="46" width="7" height="7" rx="2" fill="#5856d6" />
          <rect x="35" y="46" width="7" height="7" rx="2" fill="#5ac8fa" />
          <rect x="15" y="86" width="16" height="1.5" rx="0.75" fill="#ffffff" opacity="0.5" />
        </g>

        {/* macOS Dock preview at bottom */}
        <g transform="translate(68, 124)">
          <rect x="0" y="0" width="58" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
          <circle cx="8" cy="3" r="2" fill="#0071e3" />
          <circle cx="15" cy="3" r="2" fill="#34c759" />
          <circle cx="22" cy="3" r="2" fill="#ff9500" />
          <circle cx="29" cy="3" r="2" fill="#e26620" />
          <circle cx="36" cy="3" r="2" fill="#af52de" />
          <circle cx="43" cy="3" r="2" fill="#5ac8fa" />
          <circle cx="50" cy="3" r="2" fill="#ff2d55" />
        </g>

        {/* MacBook Aluminium Unibody Base / Keyboard deck */}
        <path d="M 5 140 L 255 140 L 244 154 L 16 154 Z" fill="url(#macBody)" />
        <rect x="90" y="137" width="80" height="3" rx="1.5" fill="#66676b" />
        <rect x="115" y="140" width="30" height="3" rx="1.5" fill="url(#macLip)" />
        <line x1="6" y1="140" x2="254" y2="140" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
        <path d="M 16 154 L 244 154 L 241 157 L 19 157 Z" fill="#848589" />
        <ellipse cx="130" cy="162" rx="116" ry="5" fill="rgba(0,0,0,0.12)" />
      </svg>
    </div>
  );
}

function WatchContinuityVisual() {
  return (
    <div className="continuity-device-frame watch-frame">
      <svg viewBox="0 0 160 170" className="continuity-device-svg watch-svg" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apple Watch Ultra with Camera Remote">
        <rect x="62" y="5" width="36" height="30" rx="6" fill="#333538" />
        <rect x="62" y="135" width="36" height="30" rx="6" fill="#333538" />
        {/* Watch Case */}
        <rect x="35" y="28" width="90" height="114" rx="28" fill="#d4d5d9" stroke="#b0b2b8" strokeWidth="1.5" />
        {/* Digital crown */}
        <rect x="125" y="48" width="6" height="22" rx="3" fill="#e26620" stroke="#b0b2b8" strokeWidth="0.8" />
        {/* Side button */}
        <rect x="125" y="80" width="4" height="26" rx="2" fill="#999aa0" />
        {/* Screen */}
        <rect x="42" y="35" width="76" height="100" rx="20" fill="#000000" />
        {/* Camera Remote preview UI */}
        <rect x="47" y="40" width="66" height="70" rx="12" fill="#181820" />
        <circle cx="80" cy="75" r="16" fill="none" stroke="#e26620" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="80" y="52" fontSize="5" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">Camera Remote</text>
        <text x="80" y="77" fontSize="6" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">48MP 1x</text>
        {/* Shutter Button on watch */}
        <circle cx="80" cy="122" r="9" fill="#ffffff" />
        <circle cx="80" cy="122" r="7" fill="#ff3b30" />
      </svg>
    </div>
  );
}

function AirPodsContinuityVisual() {
  return (
    <div className="continuity-device-frame airpods-frame">
      <svg viewBox="0 0 160 170" className="continuity-device-svg airpods-svg" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AirPods Pro 2 with Spatial Audio">
        <defs>
          <linearGradient id="airpodsGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#f5f5f7" />
            <stop offset="100%" stopColor="#e5e5ea" />
          </linearGradient>
        </defs>
        <ellipse cx="80" cy="155" rx="55" ry="8" fill="rgba(0,0,0,0.08)" />
        {/* Case Body */}
        <rect x="40" y="60" width="80" height="90" rx="26" fill="url(#airpodsGloss)" stroke="#d2d2d7" strokeWidth="1.2" />
        <line x1="40" y1="88" x2="120" y2="88" stroke="#d2d2d7" strokeWidth="1" />
        {/* Status LED */}
        <circle cx="80" cy="102" r="2" fill="#34c759" />
        {/* Left earbud */}
        <g transform="translate(42, 22)">
          <path d="M 12 12 C 6 12 2 18 2 26 C 2 34 6 40 12 40 L 16 40 C 20 40 24 34 24 26 C 24 18 20 12 16 12 Z" fill="#ffffff" stroke="#d2d2d7" strokeWidth="0.8" />
          <rect x="14" y="34" width="5" height="24" rx="2.5" fill="#f5f5f7" stroke="#d2d2d7" strokeWidth="0.8" />
          <ellipse cx="7" cy="26" rx="3" ry="5" fill="#000000" />
        </g>
        {/* Right earbud */}
        <g transform="translate(94, 22)">
          <path d="M 12 12 C 6 12 2 18 2 26 C 2 34 6 40 12 40 L 16 40 C 20 40 24 34 24 26 C 24 18 20 12 16 12 Z" fill="#ffffff" stroke="#d2d2d7" strokeWidth="0.8" />
          <rect x="5" y="34" width="5" height="24" rx="2.5" fill="#f5f5f7" stroke="#d2d2d7" strokeWidth="0.8" />
          <ellipse cx="17" cy="26" rx="3" ry="5" fill="#000000" />
        </g>
        {/* Spatial Audio wave arcs */}
        <path d="M 30 20 A 40 40 0 0 1 130 20" stroke="#0071e3" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.7" />
        <path d="M 20 12 A 55 55 0 0 1 140 12" stroke="#e26620" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.6" />
      </svg>
    </div>
  );
}

function IPadContinuityVisual() {
  return (
    <div className="continuity-device-frame ipad-frame">
      <svg viewBox="0 0 200 170" className="continuity-device-svg ipad-svg" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="iPad Pro with Apple Pencil">
        <rect x="70" y="8" width="60" height="4" rx="2" fill="#ffffff" stroke="#d2d2d7" strokeWidth="0.8" />
        <rect x="25" y="16" width="150" height="144" rx="16" fill="#1c1d22" stroke="#d2d2d7" strokeWidth="1.2" />
        <rect x="30" y="21" width="140" height="134" rx="12" fill="#0c101a" />
        <rect x="32" y="23" width="136" height="130" rx="10" fill="#1e293b" />
        <circle cx="100" cy="88" r="30" fill="#e26620" opacity="0.25" />
        <circle cx="120" cy="100" r="24" fill="#0071e3" opacity="0.2" />
        <path d="M 148 88 L 158 98 L 153 99 L 156 106 L 153 107 L 150 100 L 145 104 Z" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
        <text x="100" y="55" fontSize="6.5" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Universal Control</text>
        <text x="100" y="65" fontSize="5" fill="#e26620" textAnchor="middle" fontFamily="sans-serif">Seamless Cursor Handoff</text>
      </svg>
    </div>
  );
}

function HomeTVContinuityVisual() {
  return (
    <div className="continuity-device-frame hometv-frame">
      <svg viewBox="0 0 180 170" className="continuity-device-svg hometv-svg" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apple TV 4K & Siri Remote">
        <rect x="20" y="60" width="80" height="74" rx="18" fill="#111215" stroke="#2c2d33" strokeWidth="1.5" />
        <path d="M 52 88 C 50 85 52 82 56 82 C 59 82 61 85 59 88 C 58 90 56 94 56 97 L 64 97" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
        <text x="60" y="102" fontSize="5.5" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">4K</text>
        <circle cx="60" cy="126" r="2" fill="#ffffff" opacity="0.7" />

        <g transform="translate(115, 25)">
          <rect x="0" y="0" width="34" height="110" rx="12" fill="#d2d4d8" stroke="#a6a8ad" strokeWidth="1.2" />
          <circle cx="17" cy="24" r="11" fill="#111215" />
          <circle cx="17" cy="24" r="5" fill="#24252a" />
          <circle cx="17" cy="6" r="1" fill="#444549" />
          <circle cx="11" cy="46" r="3.5" fill="#24252a" />
          <circle cx="23" cy="46" r="3.5" fill="#24252a" />
          <circle cx="11" cy="58" r="3.5" fill="#24252a" />
          <rect x="20" y="55" width="6" height="16" rx="3" fill="#24252a" />
          <circle cx="11" cy="74" r="3.5" fill="#24252a" />
        </g>
      </svg>
    </div>
  );
}

function IPhoneContinuityVisual() {
  return (
    <div className="continuity-device-frame iphone-frame">
      <svg
        viewBox="0 0 110 200"
        className="continuity-device-svg iphone-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="iPhone 17 Pro Max in Cosmic Orange"
      >
        <defs>
          <linearGradient id="iphoneOrangeBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f47b2a" />
            <stop offset="40%" stopColor="#e26620" />
            <stop offset="100%" stopColor="#bd4e10" />
          </linearGradient>
          <linearGradient id="iphoneScreenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#181a24" />
            <stop offset="50%" stopColor="#22283a" />
            <stop offset="100%" stopColor="#0d0e14" />
          </linearGradient>
        </defs>

        <ellipse cx="55" cy="192" rx="46" ry="6" fill="rgba(0,0,0,0.18)" />
        <rect x="7" y="6" width="96" height="182" rx="22" fill="url(#iphoneOrangeBody)" stroke="#fa8e46" strokeWidth="1" />

        {/* Buttons */}
        <rect x="4.5" y="38" width="2.5" height="10" rx="1" fill="#bd4e10" />
        <rect x="4.5" y="56" width="2.5" height="18" rx="1" fill="#bd4e10" />
        <rect x="4.5" y="78" width="2.5" height="18" rx="1" fill="#bd4e10" />
        <rect x="103" y="48" width="2.5" height="24" rx="1" fill="#bd4e10" />
        <rect x="103" y="112" width="2.5" height="16" rx="1" fill="#9c3f0c" stroke="#fa8e46" strokeWidth="0.5" />

        {/* Display Screen */}
        <rect x="10" y="9" width="90" height="176" rx="19" fill="#000000" />
        <rect x="12" y="11" width="86" height="172" rx="17" fill="url(#iphoneScreenGrad)" />

        {/* Dynamic Island */}
        <rect x="39" y="16" width="32" height="8.5" rx="4.25" fill="#000000" />
        <circle cx="64" cy="20.25" r="2.2" fill="#0a121e" stroke="#1d2636" strokeWidth="0.6" />
        <rect x="42" y="18.5" width="3.5" height="3.5" rx="1" fill="#e26620" />

        {/* Status Bar */}
        <text x="24" y="22" fontSize="5.5" fill="#ffffff" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">9:41</text>
        <path d="M 86 18.5 L 91 18.5 L 91 22.5 L 86 22.5 Z" stroke="#ffffff" strokeWidth="0.8" fill="none" />
        <rect x="87" y="19.5" width="3" height="2" fill="#34c759" />

        {/* Live Continuity Status Card */}
        <g transform="translate(16, 36)">
          <rect x="0" y="0" width="78" height="40" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <circle cx="12" cy="20" r="6" fill="#e26620" />
          <path d="M 10 20 L 14 20 M 12 18 L 14 20 L 12 22" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="24" y="15" fontSize="5.5" fill="#ffffff" fontWeight="bold" fontFamily="sans-serif">iPhone Mirroring</text>
          <text x="24" y="23" fontSize="4.5" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif">Mirroring on MacBook</text>
          <text x="24" y="31" fontSize="4.2" fill="#e26620" fontWeight="600" fontFamily="sans-serif">Universal Clipboard Active</text>
        </g>

        <circle cx="55" cy="118" r="22" fill="#e26620" opacity="0.25" />
        <circle cx="42" cy="128" r="16" fill="#3b82f6" opacity="0.2" />
        <rect x="37" y="177" width="36" height="2.5" rx="1.25" fill="#ffffff" opacity="0.6" />
      </svg>
    </div>
  );
}

// 5. ECOSYSTEM INTEGRATION
export function EcosystemSection() {
  const [activeDevice, setActiveDevice] = useState("mac");

  const devices = {
    mac: {
      name: "Mac",
      title: "iPhone Mirroring & Universal Clipboard",
      desc: "View and control your iPhone 17 Pro Max right from your Mac. Type with your keyboard, use trackpad gestures, and drag files or photos between devices effortlessly.",
      highlight: "AirDrop up to 2.4x faster via Wi-Fi 7",
      Icon: Laptop,
      badge: "macOS Continuity",
      Visual: MacBookContinuityVisual,
    },
    watch: {
      name: "Apple Watch",
      title: "Remote Camera Viewfinder & Precision Finding",
      desc: "Use your Apple Watch as a live wrist viewfinder for the 48MP Pro Fusion camera. Switch focal lengths, trigger shutter release, or locate your iPhone with directional haptics.",
      highlight: "2nd-Gen Ultra Wideband locator",
      Icon: Watch,
      badge: "watchOS Sync",
      Visual: WatchContinuityVisual,
    },
    airpods: {
      name: "AirPods Pro",
      title: "Personalized Spatial Audio & Audio Mix",
      desc: "Dynamic head tracking places cinematic sound all around you. A19 Pro computational audio isolates voices and reduces wind noise automatically.",
      highlight: "Lossless Audio with sub-millisecond latency",
      Icon: Headphones,
      badge: "Adaptive Audio",
      Visual: AirPodsContinuityVisual,
    },
    ipad: {
      name: "iPad",
      title: "Universal Control & Creative Handoff",
      desc: "Use a single keyboard and mouse across iPad and iPhone 17 Pro Max. Start a 4K ProRes edit on iPhone and finish it in Final Cut Pro on iPad seamlessly.",
      highlight: "Instant iCloud Creative Sync",
      Icon: Smartphone,
      badge: "iPadOS Handoff",
      Visual: IPadContinuityVisual,
    },
    home: {
      name: "Home & Apple TV",
      title: "Smart Home Control & Touch Remote",
      desc: "Use your iPhone 17 Pro Max as an intuitive glass trackpad remote for Apple TV, or manage Thread and Matter smart accessories securely.",
      highlight: "Thread & Matter protocol support",
      Icon: Home,
      badge: "Smart Home Hub",
      Visual: HomeTVContinuityVisual,
    },
  };

  const current = devices[activeDevice];
  const CurrentIcon = current.Icon;
  const DeviceVisual = current.Visual;

  return (
    <section className="ecosystem-section">
      <div className="container">
        <span className="section-eyebrow-new">Seamless Continuity</span>
        <h2 className="section-title-new">Works like magic with your Apple devices.</h2>
        <p className="section-subtitle-new">
          iPhone 17 Pro Max connects instantly with Mac, Apple Watch, AirPods, and iPad. Select any device to explore live continuity.
        </p>

        {/* Device selector tabs */}
        <div className="ecosystem-device-tabs" role="tablist" aria-label="Apple Continuity Devices">
          {Object.entries(devices).map(([key, d]) => {
            const TabIcon = d.Icon;
            return (
              <button
                key={key}
                type="button"
                className={`ecosystem-tab-btn ${activeDevice === key ? "active" : ""}`}
                onClick={() => setActiveDevice(key)}
                role="tab"
                aria-selected={activeDevice === key}
              >
                <TabIcon size={18} />
                <span>{d.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Continuity Showcase Stage */}
        <div className="continuity-stage">
          <div className="continuity-stage-visual">
            <div className="stage-device-left">
              {DeviceVisual ? <DeviceVisual /> : <CurrentIcon size={44} className="device-stage-icon" />}
              <span className="stage-device-name">{current.name}</span>
            </div>

            <div className="continuity-bridge">
              <span className="bridge-dot" />
              <span className="bridge-line" />
              <span className="bridge-pill">{current.badge}</span>
              <span className="bridge-line" />
              <span className="bridge-dot" />
            </div>

            <div className="stage-device-right">
              <IPhoneContinuityVisual />
              <span className="stage-device-name">iPhone 17 Pro Max</span>
            </div>
          </div>

          <div className="continuity-stage-content">
            <div className="continuity-feature-badge">{current.highlight}</div>
            <h3 className="continuity-feature-title">{current.title}</h3>
            <p className="continuity-feature-desc">{current.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. COMPARISON & TECHNICAL SPECIFICATIONS
export function ComparisonTable() {
  const [viewMode, setViewMode] = useState("compare"); // "compare" | "specs"
  const [selectedCategory, setSelectedCategory] = useState("all");

  const comparisonData = {
    models: [
      {
        id: "17-pro-max",
        name: "iPhone 17 Pro Max",
        tagline: "The ultimate Pro storytelling machine",
        price: "From $1,199",
        badge: "Flagship",
        heroColor: "#e26620",
        specs: {
          display: {
            title: "6.9″ Super Retina XDR",
            details: "All-screen OLED • ProMotion up to 120Hz • Always-On • 2,000 nits outdoor peak • 1 nit minimum",
          },
          design: {
            title: "Aluminium Unibody + Ceramic Shield 2",
            details: "100% recycled aerospace aluminium • Ceramic Shield 2 front (2x tougher) • Textured matte glass back",
          },
          chip: {
            title: "A19 Pro Chip",
            details: "6-core CPU • 6-core GPU with Ray Tracing & Neural Accelerators • 16-core Neural Engine (35 TOPS)",
          },
          camera: {
            title: "48MP Pro Fusion Camera System",
            details: "48MP Main (2nd-gen OIS) • 48MP Ultra Wide (Macro 2cm) • 48MP 5x Telephoto (Tetraprism) • 8x optical-quality zoom",
          },
          frontCamera: {
            title: "18MP Center Stage Front Camera",
            details: "ƒ/1.9 autofocus • Center Stage automated subject framing • 4K Dolby Vision up to 60 fps",
          },
          battery: {
            title: "Up to 37 hours video playback",
            details: "Longest battery life in any iPhone • 25W MagSafe wireless • 50% in 30 mins with 30W adapter",
          },
          controls: {
            title: "Camera Control + Action Button",
            details: "Tactile sapphire button with force sensor • Customizable Action button",
          },
          connectivity: {
            title: "USB-C with USB 3 + Wi-Fi 7",
            details: "Up to 10Gb/s transfer speeds • Wi-Fi 7 • Bluetooth 5.4 • Thread • Second-gen UWB",
          },
        },
      },
      {
        id: "17-pro",
        name: "iPhone 17 Pro",
        tagline: "Pro power, compact form",
        price: "From $999",
        badge: "Pro",
        heroColor: "#416086",
        specs: {
          display: {
            title: "6.3″ Super Retina XDR",
            details: "All-screen OLED • ProMotion up to 120Hz • Always-On • 2,000 nits outdoor peak • 1 nit minimum",
          },
          design: {
            title: "Aluminium Unibody + Ceramic Shield 2",
            details: "100% recycled aerospace aluminium • Ceramic Shield 2 front (2x tougher) • Textured matte glass back",
          },
          chip: {
            title: "A19 Pro Chip",
            details: "6-core CPU • 6-core GPU with Ray Tracing & Neural Accelerators • 16-core Neural Engine (35 TOPS)",
          },
          camera: {
            title: "48MP Pro Fusion Camera System",
            details: "48MP Main • 48MP Ultra Wide • 48MP 5x Telephoto • 8x optical-quality zoom range",
          },
          frontCamera: {
            title: "18MP Center Stage Front Camera",
            details: "ƒ/1.9 autofocus • Center Stage automated subject framing • 4K Dolby Vision up to 60 fps",
          },
          battery: {
            title: "Up to 27 hours video playback",
            details: "All-day pro power • 25W MagSafe wireless • 50% in 30 mins with 30W adapter",
          },
          controls: {
            title: "Camera Control + Action Button",
            details: "Tactile sapphire button with force sensor • Customizable Action button",
          },
          connectivity: {
            title: "USB-C with USB 3 + Wi-Fi 7",
            details: "Up to 10Gb/s transfer speeds • Wi-Fi 7 • Bluetooth 5.4 • Thread • Second-gen UWB",
          },
        },
      },
      {
        id: "17",
        name: "iPhone 17",
        tagline: "Everyday brilliance",
        price: "From $799",
        badge: "Standard",
        heroColor: "#6c8cbf",
        specs: {
          display: {
            title: "6.1″ Super Retina XDR",
            details: "All-screen OLED • 60Hz refresh rate • Dynamic Island • 2,000 nits outdoor peak",
          },
          design: {
            title: "Aluminium Design + Ceramic Shield 2",
            details: "Aerospace-grade aluminium • Ceramic Shield 2 front • Color-infused glass back",
          },
          chip: {
            title: "A19 Chip",
            details: "6-core CPU • 5-core GPU • 16-core Neural Engine for Apple Intelligence",
          },
          camera: {
            title: "48MP Dual Camera System",
            details: "48MP Fusion Main • 12MP Ultra Wide • 2x optical-quality telephoto crop",
          },
          frontCamera: {
            title: "12MP TrueDepth Front Camera",
            details: "ƒ/1.9 autofocus • Photonic Engine • 4K Dolby Vision video recording",
          },
          battery: {
            title: "Up to 22 hours video playback",
            details: "All-day battery life • 15W MagSafe wireless • 50% in 30 mins with 20W adapter",
          },
          controls: {
            title: "Camera Control + Action Button",
            details: "Tactile sapphire button with force sensor • Customizable Action button",
          },
          connectivity: {
            title: "USB-C with USB 2 + Wi-Fi 7",
            details: "Up to 480Mb/s transfer speeds • Wi-Fi 7 • Bluetooth 5.4 • Second-gen UWB",
          },
        },
      },
    ],
  };

  const fullTechSpecs = [
    {
      category: "display",
      categoryName: "Display",
      items: [
        { label: "Screen Size", value: "6.9-inch (diagonal) all-screen OLED display" },
        { label: "Display Technology", value: "Super Retina XDR with ProMotion (adaptive refresh rates up to 120Hz)" },
        { label: "Resolution", value: "2868-by-1320-pixel resolution at 460 ppi" },
        { label: "Brightness", value: "1,000 nits max (typical); 1,600 nits peak (HDR); 2,000 nits peak (outdoor); 1 nit minimum" },
        { label: "Contrast Ratio", value: "2,000,000:1 contrast ratio (typical)" },
        { label: "Features", value: "Dynamic Island, Always-On display, True Tone, Wide color (P3), Haptic Touch, Oleophobic coating" },
      ],
    },
    {
      category: "chip",
      categoryName: "Chip & Apple Intelligence",
      items: [
        { label: "Processor", value: "A19 Pro chip with second-generation 3nm architecture" },
        { label: "CPU", value: "New 6-core CPU with 2 performance cores and 4 efficiency cores" },
        { label: "GPU", value: "New 6-core GPU with Neural Accelerators and hardware-accelerated ray tracing" },
        { label: "Neural Engine", value: "New 16-core Neural Engine delivering 35 TOPS machine learning compute" },
        { label: "AI Integration", value: "Built from the ground up for on-device Apple Intelligence and Private Cloud Compute" },
      ],
    },
    {
      category: "camera",
      categoryName: "Pro Fusion Camera System",
      items: [
        { label: "Main (Fusion)", value: "48MP, 24mm, ƒ/1.78 aperture, 2nd-gen sensor-shift OIS, 100% Focus Pixels, 24MP & 48MP super-high res" },
        { label: "Ultra Wide", value: "48MP, 13mm, ƒ/2.2 aperture, 120° field of view, Hybrid Focus Pixels, macro photography down to 2cm" },
        { label: "Telephoto", value: "48MP, 120mm, ƒ/2.8 aperture, 3D sensor-shift OIS & autofocus, tetraprism design, 5x optical zoom" },
        { label: "Optical Zoom Range", value: "5x optical zoom in, 2x optical zoom out; 10x optical zoom range (8x optical-quality reach); up to 25x digital zoom" },
        { label: "Portraits & Low Light", value: "Next-gen portraits with Focus and Depth Control, Night mode portraits enabled by LiDAR Scanner" },
        { label: "Pro Formats", value: "Apple ProRAW, ProRes Log up to 4K at 120 fps, Academy Color Encoding System (ACES), Spatial photo capture" },
      ],
    },
    {
      category: "frontCamera",
      categoryName: "Center Stage Front Camera",
      items: [
        { label: "Sensor", value: "18MP Center Stage camera with autofocus and Focus Pixels" },
        { label: "Aperture", value: "ƒ/1.9 aperture" },
        { label: "Center Stage", value: "Automated framing keeps you and others centered in FaceTime and video conferencing calls" },
        { label: "Video Recording", value: "4K Dolby Vision video recording at 24 fps, 25 fps, 30 fps, or 60 fps; Cinematic mode up to 4K HDR at 30 fps" },
        { label: "Security", value: "TrueDepth camera system for Face ID facial recognition" },
      ],
    },
    {
      category: "battery",
      categoryName: "Battery & Power",
      items: [
        { label: "Video Playback", value: "Up to 37 hours (longest in any iPhone ever)" },
        { label: "Streamed Video", value: "Up to 30 hours" },
        { label: "Audio Playback", value: "Up to 105 hours" },
        { label: "Fast Charging", value: "Up to 50% charge in 30 minutes with 30W adapter or higher (sold separately)" },
        { label: "Wireless Charging", value: "MagSafe wireless charging up to 25W with 30W adapter; Qi2 wireless charging up to 15W" },
      ],
    },
    {
      category: "design",
      categoryName: "Design & Materials",
      items: [
        { label: "Enclosure", value: "100% recycled aerospace-grade precision aluminium unibody" },
        { label: "Front Glass", value: "Ceramic Shield 2 front with advanced nanoceramic crystals (2x tougher than standard glass)" },
        { label: "Back", value: "Textured matte glass back with integrated contoured camera plateau" },
        { label: "Water Resistance", value: "Rated IP68 (maximum depth of 6 meters up to 30 minutes) under IEC standard 60529" },
        { label: "Finishes", value: "Cosmic Orange Aluminium, Deep Blue Aluminium, Silver Aluminium, Natural Aluminium, Space Black Aluminium" },
      ],
    },
    {
      category: "connectivity",
      categoryName: "Connectivity, Safety & Sensors",
      items: [
        { label: "Connector", value: "USB-C with support for charging, DisplayPort, and USB 3 (up to 10Gb/s)" },
        { label: "Wireless", value: "Wi-Fi 7 (802.11be) with 2x2 MIMO, 5G (sub-6 GHz and mmWave), Bluetooth 5.4, Thread networking" },
        { label: "Spatial Awareness", value: "Second-generation Ultra Wideband chip, Time-of-Flight LiDAR Scanner" },
        { label: "Safety Services", value: "Emergency SOS via satellite, Crash Detection, Roadside Assistance via satellite" },
        { label: "Physical Controls", value: "Tactile sapphire Camera Control button with force-sensing haptics, customizable Action button" },
      ],
    },
  ];

  const filteredSpecs = selectedCategory === "all"
    ? fullTechSpecs
    : fullTechSpecs.filter((group) => group.category === selectedCategory);

  return (
    <section className="comparison-section" id="compare" aria-label="Compare Models and Technical Specifications">
      <div className="container">
        <div className="comparison-header">
          <span className="comparison-eyebrow">Specifications &amp; Lineup</span>
          <h2 className="section-title-new">Which iPhone is right for you?</h2>
          <p className="section-subtitle-new">
            Compare key features across the iPhone 17 family or inspect the exhaustive technical specifications of iPhone 17 Pro Max.
          </p>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle" role="tablist" aria-label="Specification View Mode">
            <button
              type="button"
              className={`mode-toggle-btn ${viewMode === "compare" ? "active" : ""}`}
              onClick={() => setViewMode("compare")}
              role="tab"
              aria-selected={viewMode === "compare"}
            >
              Model Comparison
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${viewMode === "specs" ? "active" : ""}`}
              onClick={() => setViewMode("specs")}
              role="tab"
              aria-selected={viewMode === "specs"}
            >
              Full Technical Specifications
            </button>
          </div>
        </div>

        {viewMode === "compare" ? (
          <div className="comparison-models-grid">
            {comparisonData.models.map((m) => (
              <div
                key={m.id}
                className={`model-card ${m.id === "17-pro-max" ? "highlight-flagship" : ""}`}
              >
                <div className="model-header-card">
                  <span className={`model-badge ${m.id === "17-pro-max" ? "hero-badge-pill" : ""}`}>
                    {m.badge}
                  </span>
                  <h3 className="model-card-title">{m.name}</h3>
                  <p className="model-tagline">{m.tagline}</p>
                  <div className="model-price-tag">{m.price}</div>
                  <a href="#buy" className="model-cta-btn">
                    {m.id === "17-pro-max" ? "Configure Pro Max" : "Select Model"}
                  </a>
                </div>

                <div className="model-specs-list">
                  <div className="spec-row">
                    <span className="spec-label">Display</span>
                    <strong className="spec-value">{m.specs.display.title}</strong>
                    <span className="spec-sub">{m.specs.display.details}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Enclosure &amp; Durability</span>
                    <strong className="spec-value">{m.specs.design.title}</strong>
                    <span className="spec-sub">{m.specs.design.details}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Chip &amp; Intelligence</span>
                    <strong className="spec-value">{m.specs.chip.title}</strong>
                    <span className="spec-sub">{m.specs.chip.details}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Rear Camera System</span>
                    <strong className="spec-value">{m.specs.camera.title}</strong>
                    <span className="spec-sub">{m.specs.camera.details}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Front Camera</span>
                    <strong className="spec-value">{m.specs.frontCamera.title}</strong>
                    <span className="spec-sub">{m.specs.frontCamera.details}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Battery Playback</span>
                    <strong className="spec-value highlight-stat">{m.specs.battery.title}</strong>
                    <span className="spec-sub">{m.specs.battery.details}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Controls</span>
                    <strong className="spec-value">{m.specs.controls.title}</strong>
                    <span className="spec-sub">{m.specs.controls.details}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Connectivity</span>
                    <strong className="spec-value">{m.specs.connectivity.title}</strong>
                    <span className="spec-sub">{m.specs.connectivity.details}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="full-specs-container">
            {/* Category Filter Pills */}
            <div className="specs-category-pills" role="tablist" aria-label="Technical Specification Categories">
              <button
                type="button"
                className={`spec-cat-btn ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                All Specifications
              </button>
              {fullTechSpecs.map((grp) => (
                <button
                  key={grp.category}
                  type="button"
                  className={`spec-cat-btn ${selectedCategory === grp.category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(grp.category)}
                >
                  {grp.categoryName}
                </button>
              ))}
            </div>

            {/* Technical Detail Cards */}
            <div className="specs-groups-wrapper">
              {filteredSpecs.map((group) => (
                <div key={group.category} className="tech-spec-card">
                  <div className="tech-spec-card-header">
                    <h3 className="tech-spec-category-title">{group.categoryName}</h3>
                    <span className="tech-spec-badge">iPhone 17 Pro Max</span>
                  </div>
                  <div className="tech-spec-table">
                    {group.items.map((item, idx) => (
                      <div key={idx} className="tech-spec-row">
                        <div className="tech-spec-cell-label">{item.label}</div>
                        <div className="tech-spec-cell-value">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// 7. TESTIMONIALS CAROUSEL
export function TestimonialsCarousel() {
  const testimonials = [
    { text: "The camera is absolutely incredible. Best phone I've ever owned.", author: "Sarah M.", rating: 5 },
    { text: "Battery life is insane. Easily lasts me two full days.", author: "John D.", rating: 5 },
    { text: "The aluminium unibody feels exceptionally premium and the display is gorgeous.", author: "Emily R.", rating: 5 },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title-new">What people are saying.</h2>
        <div className="testimonial-card">
          <div className="stars">
            {[...Array(testimonials[current].rating)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
          </div>
          <p className="testimonial-text">"{testimonials[current].text}"</p>
          <p className="testimonial-author">— {testimonials[current].author}</p>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Precision Apple-grade product visuals for accessories without local photo assets
function MagSafeChargerVisual() {
  return (
    <svg className="accessory-product-svg" viewBox="0 0 160 160" width="140" height="140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="25W MagSafe Fast Charger">
      <defs>
        <radialGradient id="puckRimGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#e5e5ea" />
          <stop offset="100%" stopColor="#c7c7cc" />
        </radialGradient>
        <radialGradient id="puckCoreGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f2f2f7" />
        </radialGradient>
        <linearGradient id="cableGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d1d1d6" />
          <stop offset="50%" stopColor="#f2f2f7" />
          <stop offset="100%" stopColor="#c7c7cc" />
        </linearGradient>
        <filter id="chargerGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.12)" />
        </filter>
      </defs>
      {/* Ground contact shadow */}
      <ellipse cx="80" cy="136" rx="46" ry="7" fill="rgba(0,0,0,0.08)" />
      {/* MagSafe cable stem */}
      <path d="M77 106 L77 142 Q77 148 80 148 Q83 148 83 142 L83 106 Z" fill="url(#cableGrad)" />
      <rect x="76" y="104" width="8" height="5" rx="2.5" fill="#8e8e93" />
      {/* Outer Aluminium Puck Body */}
      <g filter="url(#chargerGlow)">
        <circle cx="80" cy="70" r="48" fill="url(#puckRimGrad)" stroke="#d1d1d6" strokeWidth="1" />
        {/* Inner Silicone/Glass Qi2 Charging Face */}
        <circle cx="80" cy="70" r="37" fill="url(#puckCoreGrad)" stroke="#e5e5ea" strokeWidth="1" />
        {/* Magnet Array Concentric Rings */}
        <circle cx="80" cy="70" r="28" stroke="#e5e5ea" strokeWidth="1.5" strokeDasharray="5 3" />
        {/* Subtle Apple Logo in Center */}
        <g transform="translate(68.55, 58.6) scale(0.95)">
          <path
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
            fill="#8e8e93"
          />
        </g>
      </g>
    </svg>
  );
}

function FineWovenWalletVisual() {
  return (
    <svg className="accessory-product-svg" viewBox="0 0 160 160" width="140" height="140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="iPhone FineWoven Wallet with MagSafe">
      <defs>
        <linearGradient id="walletLeather" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3728" />
          <stop offset="100%" stopColor="#2c2017" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f5f7" />
          <stop offset="50%" stopColor="#e5e5ea" />
          <stop offset="100%" stopColor="#d1d1d6" />
        </linearGradient>
        <filter id="walletShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,0.18)" />
        </filter>
      </defs>
      {/* Ground shadow */}
      <ellipse cx="80" cy="144" rx="46" ry="7" fill="rgba(0,0,0,0.12)" />
      {/* Apple Titanium Card Top Peeking Out */}
      <rect x="46" y="24" width="68" height="24" rx="4" fill="url(#cardGrad)" stroke="#c7c7cc" strokeWidth="0.8" />
      <rect x="52" y="30" width="18" height="5" rx="1.5" fill="#8e8e93" opacity="0.6" />
      {/* Wallet Body with FineWoven Microtwill and Perimeter Stitching */}
      <g filter="url(#walletShadow)">
        <rect x="42" y="36" width="76" height="102" rx="12" fill="url(#walletLeather)" stroke="#5c4533" strokeWidth="1" />
        {/* Perimeter Saddle Stitching */}
        <rect x="47" y="41" width="66" height="92" rx="8" stroke="#8c6d53" strokeWidth="0.9" strokeDasharray="3 2" fill="none" />
        {/* Top Extraction Thumb Notch */}
        <path d="M66 36 C66 48 94 48 94 36 Z" fill="#241912" />
        {/* Embossed Apple Logo in Center */}
        <path
          d="M84.2 87.8c-.8 1-1.8 1.5-2.8 1.5-.9 0-1.6-.5-2.4-.5-.8 0-1.7.5-2.5.5-1.2 0-2.3-.8-3.1-2-1.6-2.5-.4-6.3 1.9-6.3.9 0 1.7.6 2.3.6.6 0 1.5-.6 2.5-.6 1.4 0 2.4.7 3 1.7-2.1 1.2-1.7 4.1.6 5.1h.5zm-2.4-5.8c.4-.6.7-1.4.6-2.1-.7.1-1.6.5-2.1 1.1-.4.5-.7 1.3-.6 2.1.8 0 1.6-.4 2.1-1.1z"
          fill="#6d513b"
        />
        {/* MagSafe Ring Emboss Impression */}
        <circle cx="80" cy="88" r="26" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function AirPodsProVisual() {
  return (
    <svg className="accessory-product-svg" viewBox="0 0 160 160" width="140" height="140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AirPods Pro (2nd Gen) with USB-C">
      <defs>
        <linearGradient id="caseWhiteGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f5f5f7" />
          <stop offset="100%" stopColor="#e5e5ea" />
        </linearGradient>
        <linearGradient id="budGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8e8ed" />
        </linearGradient>
        <filter id="airpodsShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,0.12)" />
        </filter>
      </defs>
      {/* Ground shadow */}
      <ellipse cx="80" cy="140" rx="48" ry="7" fill="rgba(0,0,0,0.09)" />
      {/* Left AirPod Earbud */}
      <g transform="translate(32, 22)">
        <rect x="14" y="16" width="6" height="30" rx="3" fill="url(#budGrad)" stroke="#d2d2d7" strokeWidth="0.8" />
        <ellipse cx="14" cy="16" rx="11" ry="9" fill="url(#budGrad)" stroke="#d2d2d7" strokeWidth="0.8" />
        <ellipse cx="7" cy="16" rx="5" ry="7" fill="#e5e5ea" />
        <ellipse cx="16" cy="12" rx="3" ry="1.5" fill="#1d1d1f" />
        <rect x="14" y="44" width="6" height="3" rx="1.5" fill="#8e8e93" />
      </g>
      {/* Right AirPod Earbud */}
      <g transform="translate(94, 22)">
        <rect x="8" y="16" width="6" height="30" rx="3" fill="url(#budGrad)" stroke="#d2d2d7" strokeWidth="0.8" />
        <ellipse cx="14" cy="16" rx="11" ry="9" fill="url(#budGrad)" stroke="#d2d2d7" strokeWidth="0.8" />
        <ellipse cx="21" cy="16" rx="5" ry="7" fill="#e5e5ea" />
        <ellipse cx="12" cy="12" rx="3" ry="1.5" fill="#1d1d1f" />
        <rect x="8" y="44" width="6" height="3" rx="1.5" fill="#8e8e93" />
      </g>
      {/* AirPods Pro Wireless Charging Case (Front) */}
      <g filter="url(#airpodsShadow)">
        <rect x="42" y="60" width="76" height="66" rx="26" fill="url(#caseWhiteGrad)" stroke="#d2d2d7" strokeWidth="1" />
        {/* Lid Seam Line */}
        <line x1="42" y1="78" x2="118" y2="78" stroke="#d2d2d7" strokeWidth="1" />
        {/* Status LED */}
        <circle cx="80" cy="91" r="2" fill="#30d158" />
        {/* Bottom USB-C Port */}
        <rect x="74" y="123" width="12" height="3" rx="1.5" fill="#8e8e93" stroke="#c7c7cc" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function PowerAdapterVisual() {
  return (
    <svg className="accessory-product-svg" viewBox="0 0 160 160" width="140" height="140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="30W USB-C Power Adapter">
      <defs>
        <linearGradient id="adapterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#f5f5f7" />
          <stop offset="100%" stopColor="#e5e5ea" />
        </linearGradient>
        <filter id="adapterShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,0.12)" />
        </filter>
      </defs>
      {/* Ground shadow */}
      <ellipse cx="80" cy="138" rx="42" ry="7" fill="rgba(0,0,0,0.1)" />
      {/* 30W Adapter Block */}
      <g filter="url(#adapterShadow)">
        <rect x="48" y="40" width="64" height="88" rx="14" fill="url(#adapterGrad)" stroke="#d2d2d7" strokeWidth="1" />
        {/* Prongs on Bottom / Foldable pins indicator */}
        <rect x="60" y="128" width="8" height="10" rx="2" fill="#aeaeb2" />
        <rect x="92" y="128" width="8" height="10" rx="2" fill="#aeaeb2" />
        {/* Recessed USB-C Port Face on Top */}
        <rect x="65" y="56" width="30" height="12" rx="6" fill="#1c1c1e" stroke="#8e8e93" strokeWidth="0.8" />
        <rect x="72" y="60" width="16" height="4" rx="1.5" fill="#8e8e93" />
        {/* 30W Typography Label */}
        <text x="80" y="94" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" fontSize="13" fontWeight="700" textAnchor="middle" fill="#6e6e73" letterSpacing="0.04em">
          30W
        </text>
        <text x="80" y="106" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" fontSize="8" fontWeight="600" textAnchor="middle" fill="#8e8e93" letterSpacing="0.06em">
          USB-C
        </text>
      </g>
    </svg>
  );
}

// 8. ACCESSORIES SECTION
export function AccessoriesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [bag, setBag] = useState({});

  const categories = [
    { id: "all", label: "All Accessories" },
    { id: "cases", label: "Cases & Protection" },
    { id: "magsafe", label: "MagSafe & Power" },
    { id: "audio", label: "Audio" },
  ];

  const accessories = [
    {
      id: "clear-case",
      name: "iPhone 17 Pro Max Clear Case with Camera Control",
      category: "cases",
      price: "$49",
      badge: "Sapphire Crystal Button",
      desc: "Scratch-resistant polycarbonate with a conductive sapphire crystal layer for precision Camera Control gestures.",
      image: process.env.PUBLIC_URL + "/Images/file5.jpg",
      colors: ["#f5f5f7"],
    },
    {
      id: "silicone-case",
      name: "iPhone 17 Pro Max Silicone Case with MagSafe",
      category: "cases",
      price: "$49",
      badge: "25W MagSafe Ready",
      desc: "Silky, soft-touch silicone exterior with soft microfibre lining and built-in magnets for fast 25W wireless charging.",
      image: process.env.PUBLIC_URL + "/Images/p1.jpg",
      colors: ["#e26620", "#2c3e50", "#2b2b2d", "#8c7b75"],
    },
    {
      id: "magsafe-charger",
      name: "25W MagSafe Fast Charger",
      category: "magsafe",
      price: "$39",
      badge: "Up to 25W Qi2",
      desc: "Snaps magnetically to iPhone 17 Pro Max for ultra-fast wireless charging up to 25W with a 30W USB-C adapter.",
      VisualComponent: MagSafeChargerVisual,
      colors: ["#e5e5ea"],
    },
    {
      id: "finewoven-wallet",
      name: "iPhone FineWoven Wallet with MagSafe",
      category: "cases",
      price: "$59",
      badge: "Find My Support",
      desc: "Engineered from durable microtwill with suede feel. Holds up to 3 cards safely with Find My detachment alerts.",
      VisualComponent: FineWovenWalletVisual,
      colors: ["#3b2f2f", "#1f2937", "#5c4033"],
    },
    {
      id: "airpods-pro-2",
      name: "AirPods Pro (2nd Gen) with USB-C",
      category: "audio",
      price: "$249",
      badge: "Spatial Audio Mix",
      desc: "Pro-level Active Noise Cancellation, Adaptive Audio, and instantaneous one-tap pairing with iPhone 17 Pro Max.",
      VisualComponent: AirPodsProVisual,
      colors: ["#ffffff"],
    },
    {
      id: "adapter-30w",
      name: "30W USB-C Power Adapter",
      category: "magsafe",
      price: "$39",
      badge: "Fast Charging",
      desc: "Compact gallium nitride adapter. Charges iPhone 17 Pro Max battery up to 50% in approximately 30 minutes.",
      VisualComponent: PowerAdapterVisual,
      colors: ["#ffffff"],
    },
  ];

  const filteredAccessories =
    activeCategory === "all"
      ? accessories
      : accessories.filter((item) => item.category === activeCategory);

  const toggleBagItem = (id) => {
    setBag((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalInBag = Object.values(bag).filter(Boolean).length;

  return (
    <section className="accessories-section">
      <div className="container">
        <div className="accessories-header-row">
          <div>
            <span className="section-eyebrow-new">Designed for iPhone 17 Pro Max</span>
            <h2 className="section-title-new">Featured Accessories.</h2>
            <p className="section-subtitle-new">
              Mix and match cases, MagSafe 25W fast chargers, and smart audio companions crafted specifically for your device.
            </p>
          </div>
          {totalInBag > 0 && (
            <div className="bag-status-pill">
              <ShoppingBag size={16} />
              <span>{totalInBag} {totalInBag === 1 ? "item" : "items"} in Bag</span>
            </div>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="accessory-filter-row" role="tablist" aria-label="Accessory categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
              role="tab"
              aria-selected={activeCategory === cat.id}
            >
              {cat.label}
              {cat.id !== "all" && (
                <span className="cat-count">
                  {accessories.filter((a) => a.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Accessories Grid */}
        <div className="accessories-grid">
          {filteredAccessories.map((item) => {
            const isInBag = Boolean(bag[item.id]);

            return (
              <div key={item.id} className={`accessory-card ${isInBag ? "in-bag" : ""}`}>
                <div className="accessory-image">
                  <span className="accessory-badge-tag">{item.badge}</span>
                  <div className="accessory-product-frame">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="accessory-product-img"
                        loading="lazy"
                      />
                    ) : item.VisualComponent ? (
                      <item.VisualComponent />
                    ) : null}
                  </div>
                  {item.colors && item.colors.length > 1 && (
                    <div className="accessory-colors">
                      {item.colors.map((c, i) => (
                        <span key={i} className="color-pip" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="accessory-body">
                  <h3 className="accessory-title">{item.name}</h3>
                  <p className="accessory-desc">{item.desc}</p>
                  <div className="accessory-footer">
                    <span className="price">{item.price}</span>
                    <button
                      type="button"
                      className={`accessory-add-btn ${isInBag ? "added" : ""}`}
                      onClick={() => toggleBagItem(item.id)}
                      aria-label={`${isInBag ? "Remove from bag" : "Add to bag"} ${item.name}`}
                    >
                      {isInBag ? (
                        <>
                          <Check size={14} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

