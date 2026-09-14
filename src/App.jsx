import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CameraSection from "./CameraSection";
import PerformanceSection from "./PerformanceSection";
import BuySection from "./BuySection";
import Footer from "./Footer";
import IPhone17ProMax from "./IPhone17ProMax";
import AutoScroller from "./AutoScroller";
import ScrollProgress from "./ScrollProgress";

// NEW Components
import {
  ColorCarousel,
  DynamicIslandFeature,
  PrivacySection,
  CameraModesSlider,
  EcosystemSection,
  ComparisonTable,
  TestimonialsCarousel,
  AccessoriesSection,
} from "./NewComponents";

// ADVANCED Components
import {
  CinematicShowcase,
  SizeComparison,
  MagSafeInteractive,
  FeatureExplorer,
} from "./AdvancedComponents";

// EXTRA Components
import {
  ProWorkflows,
  AluminiumDesign,
  SpatialComputing,
  Sustainability,
  TradeInFinancing,
} from "./ExtraComponents";

import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Top scroll progress indicator */}
      <ScrollProgress />

      {/* Fixed global header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* 3D Rotating Phone Model */}
      <IPhone17ProMax />

      {/* Color Carousel */}
      <ColorCarousel />

      {/* ADVANCED: Size Comparison */}
      <SizeComparison />

      {/* EXTRA: Aluminium Unibody Design Interactive */}
      <AluminiumDesign />

      {/* Existing Features */}
      <FeaturesSection />

      {/* Dynamic Island Feature */}
      <DynamicIslandFeature />

      {/* Existing Camera Section */}
      <CameraSection />

      {/* ADVANCED: Cinematic Showcase */}
      <CinematicShowcase />

      {/* Camera Modes Slider */}
      <CameraModesSlider />
<AutoScroller />


      {/* EXTRA: Pro Workflows */}
      <ProWorkflows />

      {/* Existing Performance */}
      <PerformanceSection />

      {/* ADVANCED: Feature Explorer */}
      <FeatureExplorer />

      {/* EXTRA: Spatial Computing & AR */}
      <SpatialComputing />
      <PrivacySection />
      <MagSafeInteractive />
      <EcosystemSection />
      <Sustainability />
      <ComparisonTable />
      <TestimonialsCarousel /> 
      <AccessoriesSection />
      <TradeInFinancing />
      <BuySection />
      <Footer />
    </div>
  );
}

export default App;
