"use client";
import { truncateParsedData } from "../utility/truncateData.js";
import { generateReport } from "../utility/reportGenerater";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

function App() {
  const initialStartDate = new Date("2022-10-01T07:30:00-04:00");
  const initialEndDate = new Date("2022-11-30T07:30:00-04:00");
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [sortedData, setSortedData] = useState([]);
  const [genReport, setGenReport] = useState({
    TOTALREPORT: {
      revenue: 0,
      loss: 0,
      revenueNumSmallCar: 0,
      revenueNumMediumCar: 0,
      revenueNumBigCar: 0,
      revenueNumTruck1: 0,
      revenueNumTruck2: 0,
      lossNumSmallCar: 0,
      lossNumMediumCar: 0,
      lossNumBigCar: 0,
      lossNumTruck1: 0,
      lossNumTruck2: 0,
    },
    DAYREPORTARRAY: [
      {
        revenue: 0,
        loss: 0,
        revenueNumSmallCar: 0,
        revenueNumMediumCar: 0,
        revenueNumBigCar: 0,
        revenueNumTruck1: 0,
        revenueNumTruck2: 0,
        lossNumSmallCar: 0,
        lossNumMediumCar: 0,
        lossNumBigCar: 0,
        lossNumTruck1: 0,
        lossNumTruck2: 0,
      },
      {
        revenue: 0,
        loss: 0,
        revenueNumSmallCar: 0,
        revenueNumMediumCar: 0,
        revenueNumBigCar: 0,
        revenueNumTruck1: 0,
        revenueNumTruck2: 0,
        lossNumSmallCar: 0,
        lossNumMediumCar: 0,
        lossNumBigCar: 0,
        lossNumTruck1: 0,
        lossNumTruck2: 0,
      },
    ],
  });
  const [submitted, setSubmitted] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setSubmitted(false);
  //     const handleMouseMove = (e) => {
  //       const { clientX, clientY } = e;
  //       setMousePosition({ x: clientX, y: clientY });
  //     };

  //     window.addEventListener("mousemove", handleMouseMove);

  //     return () => {
  //       window.removeEventListener("mousemove", handleMouseMove);
  //     };
  //   }
  // }, []);
  useEffect(() => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(window.location.search);

    // Get the values for 'startDate' and 'endDate' from the query parameters
    const startDateParam = params.get("startDate");
    const endDateParam = params.get("endDate");

    // Update the state with the parsed values
    setStartDate(new Date(startDateParam + "T00:30:00-04:00"));
    setEndDate(new Date(endDateParam + "T00:30:00-04:00"));
    console.log(startDateParam);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );

    getData(startDate, endDate);
  }, [startDate, endDate]);
  const getData = async (startDate, endDate) => {
    try {
      const truncatedData = await truncateParsedData(startDate, endDate);

      console.log(truncatedData);
      const generatedReport = await generateReport(truncatedData);
      setGenReport(generatedReport);
    } catch (error) {
      console.error("Error truncating data:", error);
    }
  };

  const isDateValid = (date) => {
    // Function to check if a date is within the specified range
    const minDate = new Date("2022-10-01T00:00:00-04:00");
    const maxDate = new Date("2022-11-30T00:00:00-04:00");

    return date >= minDate && date <= maxDate;
  };
  return (
    <div className="App">
      {console.log(genReport)}
      <p className="welcome">welcome.</p>
      <div className="wallpaper"></div>
      <form className="calendar">
        <p>Please select a date range:</p>
        <DatePicker
          className="cal-input"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yyyy"
          // minDate={new Date("2022-10-01")}
          // maxDate={new Date("2022-11-30")}
          filterDate={isDateValid}
        />
        <DatePicker
          className="cal-input"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="MM/dd/yyyy"
          // minDate={new Date("2022-10-01")}
          // maxDate={new Date("2022-11-30")}
          filterDate={isDateValid}
        />
      </form>

      {/* Render data from genReport */}
      <div>
        <h2>Total Report</h2>
        <p>Revenue: {genReport.TOTALREPORT.revenue}</p>
        <p>Loss: {genReport.TOTALREPORT.loss}</p>
        {/* ... other properties from TOTALREPORT */}
      </div>

      <div>
        <h2>Day Report Array</h2>
        {genReport.DAYREPORTARRAY.map((dayReport) => (
          <div key={dayReport.date}>
            <h3>Date: {dayReport.date}</h3>
            <p>Revenue: {dayReport.revenue}</p>
            <p>Loss: {dayReport.loss}</p>
            {/* ... other properties from DAYREPORT */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
