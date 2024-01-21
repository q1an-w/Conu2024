"use client"
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateRange = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
    console.log(dateRange); // Replace with API call to backend
  };

  const parallaxStyle = {
    transform: `rotate(30deg) translateX(${(mousePosition.x / window.innerWidth) * 3 - 50}rem) translateY(${(mousePosition.y / window.innerHeight) * 3 - 30}rem)`,
    opacity: 0.4,
  };

  return (
    <div className="App">
      <p className="welcome">welcome.</p>
      <div className="wallpaper" style={parallaxStyle}></div>
    </div>
  );
}

export default App;
