import React, { useState } from "react";
import "./BuySection.css";

const MODELS = [
  {
    id: "pro-max",
    name: "iPhone 17 Pro Max",
    display: "6.9″ Super Retina XDR display",
    basePrice: 1199,
    desc: "The ultimate Pro storytelling machine with 8x optical-quality zoom and up to 37 hrs battery life.",
  },
  {
    id: "pro",
    name: "iPhone 17 Pro",
    display: "6.3″ Super Retina XDR display",
    basePrice: 999,
    desc: "Pro performance in a compact 6.3″ precision aluminium unibody design.",
  },
];

const FINISHES = [
  { id: "cosmic-orange", name: "Cosmic Orange", hex: "#e26620" },
  { id: "deep-blue", name: "Deep Blue Aluminium", hex: "#22354c" },
  { id: "silver", name: "Silver Aluminium", hex: "#e6e7ea" },
  { id: "natural", name: "Natural Aluminium", hex: "#9c9790" },
  { id: "black", name: "Space Black Aluminium", hex: "#1c1c1f" },
];

const STORAGE_OPTIONS = [
  { size: "256GB", addPrice: 0 },
  { size: "512GB", addPrice: 200 },
  { size: "1TB", addPrice: 400 },
  { size: "2TB", addPrice: 600 },
];

const TRADE_IN_OPTIONS = [
  { label: "No trade-in", credit: 0 },
  { label: "iPhone 16 Pro Max", credit: 650 },
  { label: "iPhone 15 Pro Max", credit: 500 },
  { label: "iPhone 14 Pro Max", credit: 380 },
  { label: "Other Smartphone", credit: 220 },
];

export default function BuySection() {
  const [selectedModel, setSelectedModel] = useState("pro-max");
  const [selectedFinish, setSelectedFinish] = useState("cosmic-orange");
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [selectedTradeIn, setSelectedTradeIn] = useState(0); // index

  const modelObj = MODELS.find((m) => m.id === selectedModel);
  const finishObj = FINISHES.find((f) => f.id === selectedFinish);
  const storageObj = STORAGE_OPTIONS.find((s) => s.size === selectedStorage);
  const tradeInObj = TRADE_IN_OPTIONS[selectedTradeIn];

  const subtotal = modelObj.basePrice + storageObj.addPrice;
  const finalPrice = Math.max(0, subtotal - tradeInObj.credit);
  const monthlyPayment = (finalPrice / 24).toFixed(2);

  return (
    <section className="buy-section" id="buy" aria-label="Configure and Buy iPhone 17 Pro Max">
      <div className="buy-container">
        {/* 1. Page Intro */}
        <header className="buy-header">
          <span className="buy-eyebrow">Store Configuration</span>
          <h2 className="buy-title">Buy {modelObj.name}</h2>
          <p className="buy-subtitle">
            From ${finalPrice} or ${monthlyPayment}/mo. for 24 mo. with Apple Card Monthly Installments.
          </p>
        </header>

        {/* 2. Side-by-Side Configuration Layout */}
        <div className="buy-layout">
          {/* Left Column: Configuration Controls */}
          <div className="buy-config-col">
            {/* Step 1: Model */}
            <section className="config-step" aria-labelledby="step-model-title">
              <div className="config-step-header">
                <span className="config-step-num">01</span>
                <h3 id="step-model-title" className="config-step-title">Model</h3>
              </div>
              <div className="config-options-models">
                {MODELS.map((m) => {
                  const isSelected = selectedModel === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={`model-option-btn ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedModel(m.id)}
                      aria-label={`Select ${m.name}`}
                      aria-pressed={isSelected}
                    >
                      <div className="model-option-info">
                        <span className="model-name">{m.name}</span>
                        <span className="model-display">{m.display}</span>
                      </div>
                      <span className="model-price">From ${m.basePrice}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Finish */}
            <section className="config-step" aria-labelledby="step-finish-title">
              <div className="config-step-header">
                <span className="config-step-num">02</span>
                <h3 id="step-finish-title" className="config-step-title">
                  Finish <span className="config-step-detail">— {finishObj.name}</span>
                </h3>
              </div>
              <div className="finish-swatches-group" role="radiogroup" aria-label="Device Finish">
                {FINISHES.map((f) => {
                  const isSelected = selectedFinish === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`finish-swatch-btn ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedFinish(f.id)}
                      aria-label={`Select ${f.name}`}
                      title={f.name}
                    >
                      <span className="finish-swatch-circle" style={{ backgroundColor: f.hex }} />
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 3: Storage */}
            <section className="config-step" aria-labelledby="step-storage-title">
              <div className="config-step-header">
                <span className="config-step-num">03</span>
                <h3 id="step-storage-title" className="config-step-title">Storage</h3>
              </div>
              <div className="storage-options-grid">
                {STORAGE_OPTIONS.map((s) => {
                  const itemPrice = modelObj.basePrice + s.addPrice;
                  const isSelected = selectedStorage === s.size;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      className={`storage-option-btn ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedStorage(s.size)}
                      aria-label={`Select ${s.size} storage`}
                      aria-pressed={isSelected}
                    >
                      <span className="storage-capacity">{s.size}</span>
                      <span className="storage-price">${itemPrice}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 4: Trade-In */}
            <section className="config-step" aria-labelledby="step-tradein-title">
              <div className="config-step-header">
                <span className="config-step-num">04</span>
                <h3 id="step-tradein-title" className="config-step-title">
                  Apple Trade-In <span className="config-step-detail">— Optional</span>
                </h3>
              </div>
              <div className="tradein-pills-row">
                {TRADE_IN_OPTIONS.map((t, idx) => {
                  const isSelected = selectedTradeIn === idx;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      className={`tradein-pill ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedTradeIn(idx)}
                      aria-pressed={isSelected}
                    >
                      <span className="tradein-label">{t.label}</span>
                      {t.credit > 0 && (
                        <span className="tradein-credit">-${t.credit}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary & Purchase */}
          <aside className="buy-summary-col" aria-label="Order Summary">
            <div className="buy-summary-card">
              <span className="summary-card-eyebrow">Order Summary</span>
              
              <div className="summary-device-header">
                <h3 className="summary-device-name">{modelObj.name}</h3>
                <p className="summary-device-specs">
                  {storageObj.size} • {finishObj.name}
                </p>
              </div>

              <div className="summary-divider" aria-hidden="true" />

              <div className="summary-price-block">
                <div className="summary-total-price">${finalPrice}</div>
                <div className="summary-monthly-note">or ${monthlyPayment}/mo. for 24 mo.*</div>
                {tradeInObj.credit > 0 && (
                  <p className="summary-savings-note">
                    Includes ${tradeInObj.credit} trade-in credit from {tradeInObj.label}.
                  </p>
                )}
              </div>

              <div className="summary-action-block">
                <a
                  href="https://www.apple.com/in/shop/buy-iphone/iphone-17-pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="buy-cta-btn"
                  aria-label="Buy Now at official Apple Store"
                >
                  Buy Now
                </a>
                <span className="summary-shipping-info">
                  Free shipping &amp; free returns · Available for pickup
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
