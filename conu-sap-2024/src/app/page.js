"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateRange = {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
    console.log(dateRange); // Replace with API call to backend
  };

  const parallaxStyle = {
    transform: `rotate(20deg) translateX(${
      (mousePosition.x / window.innerWidth) * 3 - 15
    }rem) translateY(${(mousePosition.y / window.innerHeight) * 3 - 20}rem)`,
    opacity: 0.4,
  };

  return (
    <div className="App">
      <p className="welcome">welcome.</p>
      <div className="wallpaper" style={parallaxStyle}></div>
      <form className="calendar" onSubmit={handleSubmit}>
        <p>Please select a date range:</p>
        <DatePicker
          className="cal-input"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          className="cal-input"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
