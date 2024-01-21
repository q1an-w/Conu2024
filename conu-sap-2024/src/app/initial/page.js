"use client";
import "../App.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSubmitted(false);
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setMousePosition({ x: clientX, y: clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);
  let parallaxStyle = submitted
    ? {
        transform: `translate(-70rem, -70rem) rotate(30deg)`, // Adjust values for desired effect
        transition: "transform 1s ease, opacity 1s ease",
      }
    : {
        transform: `rotate(20deg) translateX(${
          (mousePosition.x /
            (window?.innerWidth || document.documentElement.clientWidth)) *
            3 -
          25
        }rem) translateY(${
          (mousePosition.y /
            (window?.innerHeight || document.documentElement.clientHeight)) *
            3 -
          20
        }rem)`,
        opacity: 0.4,
      };

  return (
    <div className="App">
      <h1 className="title1">ReTirely Report</h1>
      <div className="wallpaper" style={parallaxStyle}></div>
    </div>
  );
}
