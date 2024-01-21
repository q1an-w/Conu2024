"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
    setTimeout(() => {
      // Replace '/another-page' with the URL you want to navigate to
      window.location.href = '/report';
    }, 1000);
  };

  const parallaxStyle = submitted
    ? {
        transform: `translate(-75rem, -80rem) rotate(30deg)`, // Adjust values for desired effect
        transition: 'transform 1s ease, opacity 1s ease',
      }
    : {
        transform: `rotate(20deg) translateX(${(mousePosition.x / window.innerWidth) * 3 - 25}rem) translateY(${(mousePosition.y / window.innerHeight) * 3 - 50}rem)`,
        opacity: 0.4,
      };

  return (
    <div className="App">
      <p className="welcome" style={{ opacity: submitted ? 0 : 1, transition: 'opacity 1s ease' }}>welcome.</p>
      <div className="wallpaper" style={parallaxStyle}></div>
      {!submitted && (
        <form className="calendar" onSubmit={handleSubmit}>
          <p>Please select a date range:</p>
          <DatePicker className="cal-input" selected={startDate} onChange={date => setStartDate(date)} />
          <DatePicker className="cal-input" selected={endDate} onChange={date => setEndDate(date)} />
          <button className="submit-btn" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
