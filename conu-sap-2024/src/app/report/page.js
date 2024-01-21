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
      <div className="App">
        <h1 className="title1">ReTirely Report</h1>
        <div className="wallpaper" style={parallaxStyle}></div>
      </div>

      {/* Render data from genReport */}
      <div className="information">
        <h2>Total Report</h2>
        <div id="total-report">
          <div id="tr-table">
            <p>Revenue: {genReport.TOTALREPORT.revenue}</p>
            <p>Loss: {genReport.TOTALREPORT.loss}</p>
          </div>
        </div>

        <div id="graph"> Graph</div>
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
