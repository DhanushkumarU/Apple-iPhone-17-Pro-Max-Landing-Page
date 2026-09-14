import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="hero-header">
      <div className="hero-header-inner">
        <div className="hero-header-main">
          <span className="hero-product-title">iPhone 17 Pro Max</span>
        </div>

        <div className="hero-header-meta">
          <div className="hero-price">
            <span className="meta-label">From</span>
            <span className="meta-value">$1,199</span>
          </div>
          <a href="#buy" className="hero-cta">Buy Now</a>
        </div>
      </div>
    </header>
  );
}
