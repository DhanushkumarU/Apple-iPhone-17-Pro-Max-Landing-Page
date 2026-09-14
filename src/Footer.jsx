import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} iPhone 17 Pro Max • Crafted by your MARK 5
      </p>
    </footer>
  );
}
