"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateRange = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
    console.log(dateRange); // Replace with API call to backend
  };

  return (
    <div className="App">
      <div className="welcome">welcome.</div>
      <div className="wallpaper"></div>
      <div className="calendar">
        <p>Please select a date range</p>
        <form onSubmit={handleSubmit}>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
          <button type="submit">Submit</button>
        </form>
      </div>
      
    </div>
  );
}

export default App;