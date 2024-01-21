"use client";
import { truncateParsedData } from "../utility/truncateData.js";
import { generateReport } from "../utility/reportGenerater";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./layout.css";
import "../App.css";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  "use client";
  const initialStartDate = new Date("2022-10-01T07:30:00-04:00");
  const initialEndDate = new Date("2022-11-30T07:30:00-04:00");
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [totalTab, setTotalTab] = useState(true);

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

  const [showPopup, setShowPopup] = useState(false);
  const [selectedDayReport, setSelectedDayReport] = useState(null);
  const handleDayClick = (dayReport) => {
    setSelectedDayReport(dayReport);
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
    setSelectedDayReport(null);
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
    if (typeof window !== "undefined") {
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${queryParams.toString()}`
      );
    }

    getData(startDate, endDate);
  }, [startDate, endDate]);
  const getData = async (startDate, endDate) => {
    try {
      const truncatedData = await truncateParsedData(startDate, endDate);
      console.log("get data called");
      console.log(truncatedData);
      const generatedReport = await generateReport(truncatedData);
      setGenReport(generatedReport);
    } catch (error) {
      console.error("Error truncating data:", error);
    }
  };
  const getChartData = (report) => {
    const { revenue, loss } = report;

    return {
      labels: ["Revenue", "Loss"],
      datasets: [
        {
          data: [revenue, loss],
          backgroundColor: ["green", "red"],
        },
      ],
    };
  };

  const isDateValid = (date) => {
    // Function to check if a date is within the specified range
    const minDate = new Date("2022-10-01T00:00:00-04:00");
    const maxDate = new Date("2022-11-30T00:00:00-04:00");

    return date >= minDate && date <= maxDate;
  };
  return (
    <div className="App">
      <h1 className="title1">ReTirely Report</h1>
      <button onClick={() => setTotalTab(true)}>Total Report</button>
      <button onClick={() => setTotalTab(false)}>Day by Day Report</button>

      {totalTab ? (
        <div className="information">
          <h2>Total Report</h2>
          <div id="total-report">
            <div id="tr-table">
              {Object.entries(genReport.TOTALREPORT).map(
                ([key, value]) =>
                  value !== 0 && (
                    <p key={key}>
                      {key}: {value}
                    </p>
                  )
              )}
            </div>
          </div>
          <div id="graph">
            <Doughnut data={getChartData(genReport.TOTALREPORT)} />
          </div>
          {/* ... other properties from TOTALREPORT */}
        </div>
      ) : (
        <div className="dayday">
          {genReport.DAYREPORTARRAY.map((dayReport) => (
            <div
              className="daydayblock"
              key={dayReport.date}
              onClick={() => handleDayClick(dayReport)}
            >
              <h3>Date: {dayReport.date}</h3>
              <div>
                <p>Revenue: {dayReport.revenue}</p>
                <p>Loss: {dayReport.loss}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={closePopup}>
              Close
            </button>
            <h2>Report For: {selectedDayReport.date} </h2>
            {selectedDayReport && (
              <div>
                <p>Date: {selectedDayReport.date}</p>
                {Object.entries(selectedDayReport).map(
                  ([key, value]) =>
                    value !== 0 && (
                      <p key={key}>
                        {key}: {value}
                      </p>
                    )
                )}
                <div id="graph">
                  <Doughnut data={getChartData(selectedDayReport)} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
