import React, { useState, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./IPhone17ProMax.css";

gsap.registerPlugin(ScrollTrigger);

export const COLORS = [
  {
    name: "Cosmic Orange",
    body: "#d85310",
    plateau: "#b63c04",
    rim: "#e86214",
    cameraRing: "#7a2804",
    metalness: 0.22,
    roughness: 0.40,
    desc: "Aluminium unibody in iconic Cosmic Orange finish with micro-blasted satin texture",
  },
  {
    name: "Natural",
    body: "#948f88",
    plateau: "#807b74",
    rim: "#aaa59e",
    cameraRing: "#64605a",
    metalness: 0.28,
    roughness: 0.38,
    desc: "Precision micro-blasted satin aluminium unibody",
  },
  {
    name: "Black",
    body: "#1c1c1f",
    plateau: "#141416",
    rim: "#2e2e32",
    cameraRing: "#0e0e10",
    metalness: 0.25,
    roughness: 0.40,
    desc: "Deep matte space black anodized aluminium unibody",
  },
  {
    name: "White",
    body: "#d2d4d8",
    plateau: "#c4c6cb",
    rim: "#e4e6ea",
    cameraRing: "#9da1aa",
    metalness: 0.30,
    roughness: 0.36,
    desc: "Clean reflective micro-texture silver aluminium unibody",
  },
  {
    name: "Deep Blue",
    body: "#1b2c40",
    plateau: "#142232",
    rim: "#2d4868",
    cameraRing: "#0f1a26",
    metalness: 0.26,
    roughness: 0.38,
    desc: "Refined deep ocean anodized aluminium unibody",
  },
];

// Helper: 2D rounded rectangle shape with mathematically straight rails
export function createRoundedRectShape(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const w = width;
  const h = height;
  const r = Math.min(radius, w / 2, h / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x + w, y + h - r);
  shape.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(x + r, y + h);
  shape.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + r);
  shape.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);

  return shape;
}

// Helper: Explicitly normalize ShapeGeometry UV coordinates to [0, 1] for edge-to-edge texturing
function normalizeShapeUVs(geometry) {
  geometry.computeBoundingBox();
  const { min, max } = geometry.boundingBox;
  const width = max.x - min.x;
  const height = max.y - min.y;
  const uvs = geometry.attributes.uv;
  const pos = geometry.attributes.position;
  for (let i = 0; i < uvs.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    uvs.setXY(i, (x - min.x) / width, (y - min.y) / height);
  }
  uvs.needsUpdate = true;
}

// Helper: Dynamic high-resolution front display wallpaper canvas matching 19.5:9 aspect ratio
function createScreenTexture(colorHex = "#e26620") {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2176;
  const ctx = canvas.getContext("2d");

  // Radiant edge-to-edge Cosmic Orange wallpaper gradient filling entire canvas
  const bgGrad = ctx.createRadialGradient(512, 850, 80, 512, 1088, 1150);
  if (colorHex === "#e26620" || colorHex === "#c85618") {
    bgGrad.addColorStop(0, "#ff8238");
    bgGrad.addColorStop(0.22, "#f0661a");
    bgGrad.addColorStop(0.50, "#c4460a");
    bgGrad.addColorStop(0.78, "#631c03");
    bgGrad.addColorStop(1, "#180500");
  } else if (colorHex === "#22354c" || colorHex === "#203144") {
    bgGrad.addColorStop(0, "#4878ab");
    bgGrad.addColorStop(0.22, "#2e5684");
    bgGrad.addColorStop(0.50, "#193457");
    bgGrad.addColorStop(0.78, "#0e1e34");
    bgGrad.addColorStop(1, "#030811");
  } else {
    bgGrad.addColorStop(0, "#5b5e68");
    bgGrad.addColorStop(0.22, "#3e424c");
    bgGrad.addColorStop(0.50, "#23262e");
    bgGrad.addColorStop(0.78, "#131519");
    bgGrad.addColorStop(1, "#060608");
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 2176);

  // Glowing concentric Apple-style geometric arcs
  ctx.save();
  ctx.lineWidth = 16;
  ctx.strokeStyle = "rgba(255, 195, 125, 0.45)";
  ctx.shadowColor = "#ffa452";
  ctx.shadowBlur = 45;

  ctx.beginPath();
  ctx.arc(512, 1280, 510, 0.2 * Math.PI, 0.8 * Math.PI, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(420, 1420, 590, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.stroke();

  ctx.lineWidth = 9;
  ctx.strokeStyle = "rgba(255, 235, 185, 0.65)";
  ctx.beginPath();
  ctx.arc(580, 1180, 380, 0.15 * Math.PI, 0.85 * Math.PI, false);
  ctx.stroke();
  ctx.restore();

  // Dynamic Island
  ctx.save();
  ctx.fillStyle = "#000000";
  const pillW = 280;
  const pillH = 78;
  const pillX = (1024 - pillW) / 2;
  const pillY = 95;
  const pillR = 39;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, pillR);
  ctx.fill();
  ctx.strokeStyle = "#252528";
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // TrueDepth camera & proximity sensor dots inside Dynamic Island
  ctx.fillStyle = "#0b1626";
  ctx.beginPath();
  ctx.arc(pillX + 54, pillY + pillH / 2, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#052614";
  ctx.beginPath();
  ctx.arc(pillX + pillW - 54, pillY + pillH / 2, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Status Bar
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 38px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
  ctx.fillText("9:41", 92, 148);

  // Status Icons (Signal, 5G, Battery)
  ctx.font = "600 28px -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("5G", 870, 146);
  ctx.strokeRect(890, 122, 54, 30);
  ctx.fillStyle = "#34c759";
  ctx.fillRect(894, 126, 42, 22);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(946, 132, 4, 10);
  ctx.restore();

  // Date and Time Lockscreen Typography
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.90)";
  ctx.font = "500 44px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
  ctx.fillText("Tuesday, September 9", 512, 400);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 226px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
  ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
  ctx.shadowBlur = 35;
  ctx.fillText("9:41", 512, 620);
  ctx.restore();

  // Quick Action Buttons at bottom
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
  ctx.beginPath();
  ctx.arc(140, 1960, 56, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "44px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("🔦", 140, 1960);

  ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
  ctx.beginPath();
  ctx.arc(884, 1960, 56, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText("📷", 884, 1960);

  // Home Indicator Capsule
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(512 - 180, 2095, 360, 12, 6);
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// Helper: Apple Logo Canvas Texture for back panel
function createAppleLogoTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 256, 256);
  ctx.save();
  ctx.translate(128, 128);
  ctx.scale(5.8, 5.8);
  ctx.translate(-12, -15);

  ctx.fillStyle = "rgba(255, 255, 255, 0.42)";
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 4;
  const path = new Path2D(
    "M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"
  );
  ctx.fill(path);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Master Phase 3 iPhone 17 Pro Max 3D Model Builder (LOCKED & SHARED)
export function createPhase3IPhoneGroup(selectedColor = COLORS[0], options = {}) {
  const { onWallpaperLoaded } = options;
  const phoneGroup = new THREE.Group();

  // 1. Unibody Chassis Mesh (Extruded Rounded Rectangle with Straight Rails)
  const bodyWidth = 2.4;
  const bodyHeight = 5.0;
  const bodyRadius = 0.38;
  const bodyDepth = 0.25;

  const chassisShape = createRoundedRectShape(bodyWidth, bodyHeight, bodyRadius);
  const chassisGeo = new THREE.ExtrudeGeometry(chassisShape, {
    depth: bodyDepth - 0.04,
    bevelEnabled: true,
    bevelThickness: 0.024,
    bevelSize: 0.02,
    bevelSegments: 8,
    curveSegments: 36,
  });
  chassisGeo.center();

  const chassisMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(selectedColor.body),
    metalness: selectedColor.metalness,
    roughness: selectedColor.roughness,
    envMapIntensity: 0.45,
  });

  const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
  phoneGroup.add(chassisMesh);

  // 2. Front Screen Mesh (Edge-to-edge display surface with normalized UVs)
  const screenShape = createRoundedRectShape(bodyWidth - 0.08, bodyHeight - 0.08, bodyRadius - 0.04);
  const screenGeo = new THREE.ShapeGeometry(screenShape, 36);
  normalizeShapeUVs(screenGeo);

  // Load official reference wallpaper extracted from Reference Image 2
  const textureLoader = new THREE.TextureLoader();
  const fallbackCanvasTex = createScreenTexture(selectedColor.body);
  const wallpaperTex = textureLoader.load(
    process.env.PUBLIC_URL + "/Images/iphone17-display-wallpaper.png",
    () => {
      if (onWallpaperLoaded) onWallpaperLoaded();
    }
  );
  wallpaperTex.colorSpace = THREE.SRGBColorSpace;
  wallpaperTex.minFilter = THREE.LinearMipmapLinearFilter;
  wallpaperTex.magFilter = THREE.LinearFilter;

  const screenMat = new THREE.MeshBasicMaterial({
    map: selectedColor.name === "Cosmic Orange" ? wallpaperTex : fallbackCanvasTex,
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.z = bodyDepth / 2 + 0.005;
  phoneGroup.add(screenMesh);

  // Front Glass Gloss Sheen Plane (Crisp Ceramic Shield 2 specular sheen without cloudy white opacity)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.0,
    roughness: 0.02,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  });
  const glassMesh = new THREE.Mesh(screenGeo, glassMat);
  glassMesh.position.z = bodyDepth / 2 + 0.008;
  phoneGroup.add(glassMesh);

  // 3. Rear Camera Plateau (iPhone 17 Pro Max Wide Island matching reference)
  const plateauWidth = 2.22;
  const plateauHeight = 1.36;
  const plateauRadius = 0.28;
  const plateauDepth = 0.072;
  const plateauBevel = 0.016;

  const plateauShape = createRoundedRectShape(plateauWidth, plateauHeight, plateauRadius);
  const plateauGeo = new THREE.ExtrudeGeometry(plateauShape, {
    depth: plateauDepth,
    bevelEnabled: true,
    bevelThickness: plateauBevel,
    bevelSize: 0.015,
    bevelSegments: 6,
    curveSegments: 32,
  });
  plateauGeo.center();

  const plateauMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(selectedColor.plateau),
    metalness: Math.max(0.12, selectedColor.metalness * 0.9),
    roughness: selectedColor.roughness + 0.04,
    envMapIntensity: 0.45,
  });

  const plateauMesh = new THREE.Mesh(plateauGeo, plateauMat);
  const halfPlateauZ = (plateauDepth + 2 * plateauBevel) / 2;
  const plateauCenterZ = -bodyDepth / 2 - halfPlateauZ;
  plateauMesh.position.set(0, 1.76, plateauCenterZ);
  phoneGroup.add(plateauMesh);

  // Surface plane of plateau where lenses, flash, LiDAR sit proudly
  const plateauSurfaceZ = plateauCenterZ - halfPlateauZ;

  // 4. Three Pro Fusion Camera Lenses (clustered accurately on left side of plateau)
  const lensRingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(selectedColor.cameraRing),
    metalness: 0.94,
    roughness: 0.18,
  });

  const innerBezelMat = new THREE.MeshStandardMaterial({
    color: 0x121216,
    metalness: 0.85,
    roughness: 0.45,
  });

  const sapphireGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x050c1a,
    metalness: 0.35,
    roughness: 0.03,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  });

  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x010204 });

  // Camera lenses accurately clustered on left side of plateau when viewed from rear
  const lensPositions = [
    { x: 0.74, y: 2.06 }, // Main Fusion (Top Left when viewed from rear)
    { x: 0.74, y: 1.48 }, // Telephoto (Bottom Left when viewed from rear)
    { x: 0.22, y: 1.77 }, // Ultra Wide (Middle Left when viewed from rear)
  ];

  lensPositions.forEach(({ x, y }) => {
    const lensGroup = new THREE.Group();
    lensGroup.position.set(x, y, plateauSurfaceZ);
    lensGroup.rotation.x = -Math.PI / 2; // Local +Y points OUTWARD in -Z towards viewer

    // Outer CNC Collar
    const collarHeight = 0.075;
    const collarGeo = new THREE.CylinderGeometry(0.24, 0.24, collarHeight, 36);
    const collarMesh = new THREE.Mesh(collarGeo, lensRingMat);
    collarMesh.position.y = collarHeight / 2;
    lensGroup.add(collarMesh);

    // Inner Step Ring
    const stepHeight = 0.078;
    const innerBezelGeo = new THREE.CylinderGeometry(0.20, 0.20, stepHeight, 36);
    const innerBezelMesh = new THREE.Mesh(innerBezelGeo, innerBezelMat);
    innerBezelMesh.position.y = stepHeight / 2;
    lensGroup.add(innerBezelMesh);

    // Sapphire Glass
    const sapphireHeight = 0.081;
    const sapphireGeo = new THREE.CylinderGeometry(0.17, 0.17, sapphireHeight, 36);
    const sapphireMesh = new THREE.Mesh(sapphireGeo, sapphireGlassMat);
    sapphireMesh.position.y = sapphireHeight / 2;
    lensGroup.add(sapphireMesh);

    // Internal Camera Core / Pupil
    const pupilHeight = 0.083;
    const pupilGeo = new THREE.CylinderGeometry(0.075, 0.075, pupilHeight, 24);
    const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
    pupilMesh.position.y = pupilHeight / 2;
    lensGroup.add(pupilMesh);

    phoneGroup.add(lensGroup);
  });

  // 5. Sensors on Camera Plateau (positioned on right side with wide gap from lenses)
  // Adaptive True Tone Flash (Top Right when viewed from rear)
  const flashGroup = new THREE.Group();
  flashGroup.position.set(-0.76, 2.06, plateauSurfaceZ);
  flashGroup.rotation.x = -Math.PI / 2;

  const flashRimHeight = 0.035;
  const flashRimGeo = new THREE.CylinderGeometry(0.13, 0.13, flashRimHeight, 28);
  const flashRimMat = new THREE.MeshStandardMaterial({ color: 0xd8cebe, metalness: 0.82, roughness: 0.22 });
  const flashRimMesh = new THREE.Mesh(flashRimGeo, flashRimMat);
  flashRimMesh.position.y = flashRimHeight / 2;
  flashGroup.add(flashRimMesh);

  const flashDiffuserHeight = 0.038;
  const flashCenterGeo = new THREE.CylinderGeometry(0.10, 0.10, flashDiffuserHeight, 28);
  const flashCenterMat = new THREE.MeshStandardMaterial({
    color: 0xfff6dd,
    emissive: 0xffd988,
    emissiveIntensity: 0.40,
    roughness: 0.25,
    metalness: 0.1,
  });
  const flashCenterMesh = new THREE.Mesh(flashCenterGeo, flashCenterMat);
  flashCenterMesh.position.y = flashDiffuserHeight / 2;
  flashGroup.add(flashCenterMesh);
  phoneGroup.add(flashGroup);

  // Rear Studio Microphone Pinhole (Centered vertically between flash & LiDAR)
  const micGroup = new THREE.Group();
  micGroup.position.set(-0.76, 1.77, plateauSurfaceZ);
  micGroup.rotation.x = -Math.PI / 2;

  const micHeight = 0.022;
  const micGeo = new THREE.CylinderGeometry(0.030, 0.030, micHeight, 18);
  const micMat = new THREE.MeshBasicMaterial({ color: 0x08080a });
  const micMesh = new THREE.Mesh(micGeo, micMat);
  micMesh.position.y = micHeight / 2;
  micGroup.add(micMesh);
  phoneGroup.add(micGroup);

  // LiDAR Scanner Aperture (Bottom Right when viewed from rear)
  const lidarGroup = new THREE.Group();
  lidarGroup.position.set(-0.76, 1.46, plateauSurfaceZ);
  lidarGroup.rotation.x = -Math.PI / 2;

  const lidarRimHeight = 0.030;
  const lidarGeo = new THREE.CylinderGeometry(0.12, 0.12, lidarRimHeight, 28);
  const lidarMat = new THREE.MeshStandardMaterial({ color: 0x1a1a20, roughness: 0.40, metalness: 0.70 });
  const lidarMesh = new THREE.Mesh(lidarGeo, lidarMat);
  lidarMesh.position.y = lidarRimHeight / 2;
  lidarGroup.add(lidarMesh);

  const lidarOpticHeight = 0.034;
  const lidarOpticGeo = new THREE.CylinderGeometry(0.09, 0.09, lidarOpticHeight, 28);
  const lidarOpticMat = new THREE.MeshPhysicalMaterial({
    color: 0x08090d,
    roughness: 0.12,
    metalness: 0.40,
    clearcoat: 0.90,
    clearcoatRoughness: 0.08,
  });
  const lidarOpticMesh = new THREE.Mesh(lidarOpticGeo, lidarOpticMat);
  lidarOpticMesh.position.y = lidarOpticHeight / 2;
  lidarGroup.add(lidarOpticMesh);
  phoneGroup.add(lidarGroup);

  // 6. Apple Logo on Back Panel
  const appleLogoTex = createAppleLogoTexture();
  const appleLogoGeo = new THREE.PlaneGeometry(0.58, 0.58);
  const appleLogoMat = new THREE.MeshBasicMaterial({
    map: appleLogoTex,
    transparent: true,
    opacity: 0.75,
  });
  const appleLogoMesh = new THREE.Mesh(appleLogoGeo, appleLogoMat);
  appleLogoMesh.position.set(0, -0.22, -bodyDepth / 2 - 0.004);
  appleLogoMesh.rotation.y = Math.PI;
  phoneGroup.add(appleLogoMesh);

  // 7. Physical Hardware Controls (Aligned along straight rails)
  const buttonMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(selectedColor.rim),
    metalness: 0.90,
    roughness: 0.28,
  });

  // LEFT SIDE: Action Button + Volume Up + Volume Down
  // Action Button
  const actionBtnGeo = new THREE.BoxGeometry(0.045, 0.28, 0.09);
  const actionBtn = new THREE.Mesh(actionBtnGeo, buttonMat);
  actionBtn.position.set(-bodyWidth / 2 - 0.015, 1.25, 0);
  phoneGroup.add(actionBtn);

  // Volume Up
  const volUpGeo = new THREE.BoxGeometry(0.045, 0.48, 0.09);
  const volUp = new THREE.Mesh(volUpGeo, buttonMat);
  volUp.position.set(-bodyWidth / 2 - 0.015, 0.68, 0);
  phoneGroup.add(volUp);

  // Volume Down
  const volDownGeo = new THREE.BoxGeometry(0.045, 0.48, 0.09);
  const volDown = new THREE.Mesh(volDownGeo, buttonMat);
  volDown.position.set(-bodyWidth / 2 - 0.015, 0.08, 0);
  phoneGroup.add(volDown);

  // RIGHT SIDE: Side Button + Camera Control
  // Side Button (Power/Siri)
  const sideBtnGeo = new THREE.BoxGeometry(0.045, 0.60, 0.09);
  const sideBtn = new THREE.Mesh(sideBtnGeo, buttonMat);
  sideBtn.position.set(bodyWidth / 2 + 0.015, 0.68, 0);
  phoneGroup.add(sideBtn);

  // Camera Control (Flush capacitive sensor with sapphire cover)
  const cameraCtrlGroup = new THREE.Group();
  cameraCtrlGroup.position.set(bodyWidth / 2 + 0.005, -0.75, 0);
  const cameraCtrlGeo = new THREE.BoxGeometry(0.02, 0.62, 0.12);
  const cameraCtrlMat = new THREE.MeshPhysicalMaterial({
    color: 0x141416,
    metalness: 0.4,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });
  const cameraCtrlMesh = new THREE.Mesh(cameraCtrlGeo, cameraCtrlMat);
  cameraCtrlGroup.add(cameraCtrlMesh);
  phoneGroup.add(cameraCtrlGroup);

  // BOTTOM: USB-C port + acoustic openings
  const usbcPortGeo = new THREE.BoxGeometry(0.32, 0.04, 0.12);
  const usbcPortMat = new THREE.MeshBasicMaterial({ color: 0x060608 });
  const usbcPort = new THREE.Mesh(usbcPortGeo, usbcPortMat);
  usbcPort.position.set(0, -bodyHeight / 2 - 0.01, 0);
  phoneGroup.add(usbcPort);

  // USB-C Tongue
  const usbcTongueGeo = new THREE.BoxGeometry(0.18, 0.045, 0.02);
  const usbcTongueMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d5, metalness: 0.9, roughness: 0.2 });
  const usbcTongue = new THREE.Mesh(usbcTongueGeo, usbcTongueMat);
  usbcTongue.position.set(0, -bodyHeight / 2 - 0.01, 0);
  phoneGroup.add(usbcTongue);

  // Mic & Speaker Holes
  const holeMat = new THREE.MeshBasicMaterial({ color: 0x060608 });
  const holeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.04, 12);
  [-0.5, -0.4, -0.3, 0.3, 0.4, 0.5, 0.6, 0.7].forEach((hx) => {
    const hole = new THREE.Mesh(holeGeo, holeMat);
    hole.position.set(hx, -bodyHeight / 2 - 0.01, 0);
    phoneGroup.add(hole);
  });

  return {
    phoneGroup,
    chassisMat,
    plateauMat,
    lensRingMat,
    screenMesh,
    wallpaperTex,
  };
}

function IPhone17ProMax() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [activeAngle, setActiveAngle] = useState("cameraBack");
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // 3D references
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const phoneGroupRef = useRef(null);
  const chassisMatRef = useRef(null);
  const plateauMatRef = useRef(null);
  const lensRingsMatRef = useRef(null);
  const screenMeshRef = useRef(null);
  const wallpaperTexRef = useRef(null);

  // Interaction tracking
  const targetRotation = useRef({ x: 0, y: Math.PI });
  const currentRotation = useRef({ x: 0, y: Math.PI });
  const isDragging = useRef(false);
  const startMousePos = useRef({ x: 0, y: 0 });
  const autoRotate = useRef(true);
  const resumeTimer = useRef(null);
  const animFrameId = useRef(null);

  // Smooth angle transition helper
  const snapTo = useCallback((x, y, angleKey = "") => {
    autoRotate.current = false;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    targetRotation.current = { x, y };
    setActiveAngle(angleKey);

    resumeTimer.current = setTimeout(() => {
      autoRotate.current = true;
    }, 4500);
  }, []);

  // Update materials when color changes
  useEffect(() => {
    if (chassisMatRef.current) {
      chassisMatRef.current.color.set(selectedColor.body);
      chassisMatRef.current.metalness = selectedColor.metalness;
      chassisMatRef.current.roughness = selectedColor.roughness;
    }
    if (plateauMatRef.current) {
      plateauMatRef.current.color.set(selectedColor.plateau);
    }
    if (lensRingsMatRef.current) {
      lensRingsMatRef.current.color.set(selectedColor.cameraRing);
    }
    if (screenMeshRef.current) {
      if (selectedColor.name === "Cosmic Orange" && wallpaperTexRef.current) {
        screenMeshRef.current.material.map = wallpaperTexRef.current;
      } else {
        const newScreenTex = createScreenTexture(selectedColor.body);
        screenMeshRef.current.material.map = newScreenTex;
      }
      screenMeshRef.current.material.needsUpdate = true;
    }
  }, [selectedColor]);

  // Main Three.js setup
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 640;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Dynamic Camera framing helper: provides comfortable breathing room across all rotation angles
    const updateCameraFraming = (cam, w, h) => {
      const aspect = w / h;
      cam.aspect = aspect;
      cam.fov = 30;
      if (aspect < 0.75) {
        // Mobile narrow portrait: comfortable framing with zero horizontal or vertical clipping
        cam.position.set(0, 0, 14.4);
      } else if (aspect < 1.05) {
        // Tablet / square viewport: balanced margins
        cam.position.set(0, 0, 13.8);
      } else {
        // Desktop landscape: refined scale ensuring comfortable viewport breathing room alongside color options
        cam.position.set(0, 0, 13.6);
      }
      cam.updateProjectionMatrix();
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    updateCameraFraming(camera, width, height);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.98;
    rendererRef.current = renderer;

    // Procedural Dark Studio Reflection Environment (Softbox ribbons against dark studio flags)
    // Prevents white environment wash so Cosmic Orange aluminium retains rich saturated pigment
    const envCanvas = document.createElement("canvas");
    envCanvas.width = 512;
    envCanvas.height = 256;
    const envCtx = envCanvas.getContext("2d");
    const envGrad = envCtx.createLinearGradient(0, 0, 0, 256);
    envGrad.addColorStop(0, "#2a2d34");
    envGrad.addColorStop(0.35, "#1c1e22");
    envGrad.addColorStop(0.70, "#101114");
    envGrad.addColorStop(1, "#070809");
    envCtx.fillStyle = envGrad;
    envCtx.fillRect(0, 0, 512, 256);

    // Overhead diffuse softbox highlight ribbon
    envCtx.fillStyle = "#fff8f0";
    envCtx.beginPath();
    envCtx.ellipse(256, 32, 130, 20, 0, 0, Math.PI * 2);
    envCtx.fill();

    // Subtle warm studio bounce on left side
    envCtx.fillStyle = "rgba(255, 145, 65, 0.45)";
    envCtx.beginPath();
    envCtx.ellipse(75, 128, 45, 85, 0, 0, Math.PI * 2);
    envCtx.fill();

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    // Studio Lighting Environment: Controlled Key, Fill, Rim & Floor Bounce
    // Soft hemisphere light provides warm directional ambient without washing out shadows
    const hemiLight = new THREE.HemisphereLight(0xfff8f2, 0x181008, 0.32);
    scene.add(hemiLight);

    // Front Key Light (Warm daylight key on front display & chamfers)
    const frontKey = new THREE.DirectionalLight(0xfff5ec, 1.8);
    frontKey.position.set(3.2, 4.5, 4.8);
    scene.add(frontKey);

    // Front Fill Light (Soft cool fill)
    const frontFill = new THREE.DirectionalLight(0xdce7f6, 0.7);
    frontFill.position.set(-3.0, 1.5, 3.8);
    scene.add(frontFill);

    // Rear Key Light (High-power direct key on rear unibody, camera plateau & lenses)
    const rearKey = new THREE.DirectionalLight(0xfff0e2, 2.2);
    rearKey.position.set(-2.8, 4.5, -4.5);
    scene.add(rearKey);

    // Rear Fill Light (Soft cool fill on camera module)
    const rearFill = new THREE.DirectionalLight(0xd0def0, 0.8);
    rearFill.position.set(3.0, 1.5, -3.8);
    scene.add(rearFill);

    // Left Rim Light (Warm grazing edge light on left straight rail and action buttons)
    const leftRim = new THREE.DirectionalLight(0xff7722, 1.8);
    leftRim.position.set(-5.5, 0.2, 0);
    scene.add(leftRim);

    // Right Rim Light (Grazing edge light on right rail and flush Camera Control)
    const rightRim = new THREE.DirectionalLight(0xff8833, 1.8);
    rightRim.position.set(5.5, 0.2, 0);
    scene.add(rightRim);

    // Top Light (Grazing light for top rail and chamfers)
    const topLight = new THREE.DirectionalLight(0xffffff, 1.0);
    topLight.position.set(0, 6.0, 0.2);
    scene.add(topLight);

    // Floor Bounce Light (Simulates warm floor reflection)
    const floorBounce = new THREE.DirectionalLight(0xffdfc4, 0.4);
    floorBounce.position.set(0, -4.0, 0);
    scene.add(floorBounce);

    // Master Phone Group (Created from approved Phase 3 builder)
    const {
      phoneGroup,
      chassisMat,
      plateauMat,
      lensRingMat,
      screenMesh,
      wallpaperTex,
    } = createPhase3IPhoneGroup(selectedColor, {
      onWallpaperLoaded: () => {
        if (rendererRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, camera);
        }
      },
    });

    phoneGroup.rotation.set(targetRotation.current.x, targetRotation.current.y, 0);
    scene.add(phoneGroup);
    phoneGroupRef.current = phoneGroup;
    chassisMatRef.current = chassisMat;
    plateauMatRef.current = plateauMat;
    lensRingsMatRef.current = lensRingMat;
    screenMeshRef.current = screenMesh;
    wallpaperTexRef.current = wallpaperTex;

    // 8. Authentic Studio Ground Pedestal Shadow (Occlusion Core + Soft Ambient Dispersion)
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 512;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext("2d");
    
    // Core tight occlusion shadow directly under phone base
    const coreGrad = shadowCtx.createRadialGradient(256, 128, 0, 256, 128, 140);
    coreGrad.addColorStop(0, "rgba(0, 0, 0, 0.52)");
    coreGrad.addColorStop(0.35, "rgba(0, 0, 0, 0.22)");
    coreGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.05)");
    coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    shadowCtx.fillStyle = coreGrad;
    shadowCtx.beginPath();
    shadowCtx.ellipse(256, 128, 220, 68, 0, 0, Math.PI * 2);
    shadowCtx.fill();

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(4.2, 2.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.position.set(0, -2.85, 0);
    shadowPlane.rotation.x = -Math.PI / 2;
    scene.add(shadowPlane);

    // Animation Render Loop with Viewport Visibility Observer (Saves GPU/CPU when scrolled away)
    let isVisible = true;
    let observer = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.02 }
      );
      observer.observe(container);
    }

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (autoRotate.current && !prefersReducedMotion) {
        targetRotation.current.y += 0.004;
      }

      // Smooth interpolation (slerp/damping)
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;

      phoneGroup.rotation.x = currentRotation.current.x;
      phoneGroup.rotation.y = currentRotation.current.y;

      // Soft shadow scale responds subtly to rotation
      const absX = Math.abs(currentRotation.current.x);
      shadowPlane.scale.set(1 + absX * 0.2, 1 + absX * 0.2, 1);
      shadowMat.opacity = Math.max(0.3, 0.7 - absX * 0.25);

      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer with dynamic camera framing
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      updateCameraFraming(camera, w, h);
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      if (observer) observer.disconnect();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      window.removeEventListener("resize", handleResize);

      // Dispose Geometries & Materials
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
      if (wallpaperTexRef.current) {
        wallpaperTexRef.current.dispose();
      }
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Mouse & Touch Drag Handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    autoRotate.current = false;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    startMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const deltaX = e.clientX - startMousePos.current.x;
      const deltaY = e.clientY - startMousePos.current.y;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x = Math.max(-0.55, Math.min(0.55, targetRotation.current.x + deltaY * 0.008));

      startMousePos.current = { x: e.clientX, y: e.clientY };
    } else {
      // Gentle gyro-tilt on hover
      const rect = e.currentTarget.getBoundingClientRect();
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 0.15;
      targetRotation.current.x = ny;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      autoRotate.current = true;
    }, 3200);
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    autoRotate.current = false;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    const touch = e.touches[0];
    startMousePos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startMousePos.current.x;
    const deltaY = touch.clientY - startMousePos.current.y;

    targetRotation.current.y += deltaX * 0.008;
    targetRotation.current.x = Math.max(-0.55, Math.min(0.55, targetRotation.current.x + deltaY * 0.008));

    startMousePos.current = { x: touch.clientX, y: touch.clientY };
  };

  return (
    <section className="showcase" id="iphone17-3d">
      {/* Sticky Header with Title and Finishes */}
      <div className="iphone17-header">
        <h2 className="title">iPhone 17 Pro Max</h2>
        <p className="subtitle">
          Aluminium unibody. Engineered for peak performance.
        </p>

        {/* Finish Selector */}
        <div className="colors">
          {COLORS.map((color) => (
            <button
              key={color.name}
              className={`color-btn ${selectedColor.name === color.name ? "active" : ""}`}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select ${color.name} Finish`}
            >
              <span className="color-circle" style={{ backgroundColor: color.body }} />
              <span>{color.name}</span>
            </button>
          ))}
        </div>

        <p className="color-description">{selectedColor.desc}</p>

        {/* Quick Angle Snap Controls */}
        <div className="angle-snap-row">
          <button
            type="button"
            className={`angle-pill-btn ${activeAngle === "front" ? "active" : ""}`}
            onClick={() => snapTo(0, 0, "front")}
          >
            Front Display
          </button>
          <button
            type="button"
            className={`angle-pill-btn ${activeAngle === "cameraBack" ? "active" : ""}`}
            onClick={() => snapTo(0, Math.PI, "cameraBack")}
          >
            48MP Camera Back
          </button>
          <button
            type="button"
            className={`angle-pill-btn ${activeAngle === "profile" ? "active" : ""}`}
            onClick={() => snapTo(0, Math.PI / 2, "profile")}
          >
            Unibody Profile
          </button>
          <button
            type="button"
            className={`angle-pill-btn ${activeAngle === "cameraControl" ? "active" : ""}`}
            onClick={() => snapTo(0, -Math.PI / 2, "cameraControl")}
          >
            Camera Control
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewer Container */}
      <div
        className="viewer-3d-webgl"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        role="region"
        aria-label="Interactive 3D iPhone 17 Pro Max product viewer"
      >
        <canvas ref={canvasRef} className="webgl-canvas" />

        <div className="interaction-hint">
          <span className="hint-icon">✦</span>
          <span>Drag horizontally or vertically to rotate 360° • Hover to tilt</span>
        </div>
      </div>

      {/* Flagship Feature Highlights (matching reference design - interactive snap to 3D angles) */}
      <div className="flagship-feature-bar" role="tablist" aria-label="3D hardware feature focus">
        <button
          type="button"
          className={`feature-pill-item ${activeAngle === "a19" ? "active" : ""}`}
          onClick={() => snapTo(0.15, Math.PI * 0.75, "a19")}
          aria-label="Focus A19 Pro Silicon Angle"
        >
          <div className="pill-badge a19-badge">A19</div>
          <div className="pill-text">
            <span className="pill-title">A19 Pro</span>
            <span className="pill-desc">3nm Pro Silicon</span>
          </div>
        </button>

        <button
          type="button"
          className={`feature-pill-item ${activeAngle === "cameraBack" ? "active" : ""}`}
          onClick={() => snapTo(0, Math.PI, "cameraBack")}
          aria-label="Focus 48MP Pro Fusion Camera Plateau"
        >
          <div className="pill-icon">📷</div>
          <div className="pill-text">
            <span className="pill-title">48MP Pro Fusion</span>
            <span className="pill-desc">Triple 48MP Sensors</span>
          </div>
        </button>

        <button
          type="button"
          className={`feature-pill-item ${activeAngle === "profile" ? "active" : ""}`}
          onClick={() => snapTo(0, Math.PI / 2, "profile")}
          aria-label="Focus Aluminium Unibody Profile"
        >
          <div className="pill-icon">◈</div>
          <div className="pill-text">
            <span className="pill-title">Aluminium Unibody</span>
            <span className="pill-desc">Precision Machined</span>
          </div>
        </button>

        <button
          type="button"
          className={`feature-pill-item ${activeAngle === "front" ? "active" : ""}`}
          onClick={() => snapTo(0, 0, "front")}
          aria-label="Focus Super Retina XDR Display"
        >
          <div className="pill-icon">☼</div>
          <div className="pill-text">
            <span className="pill-title">Pro Display</span>
            <span className="pill-desc">6.9″ Super Retina XDR</span>
          </div>
        </button>
      </div>
    </section>
  );
}

export default IPhone17ProMax;
