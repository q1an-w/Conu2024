"use client";
import { truncateParsedData } from "../utility/truncateData.js";
import { generateReport } from "../utility/reportGenerater";
import React, { useState, useEffect } from "react";
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
        date: 0,
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
        date: 0,
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
    const params = new URLSearchParams(window.location.search);

    const startDateParam = params.get("startDate");
    const endDateParam = params.get("endDate");
    console.log(new Date(startDateParam + "T07:30:00-04:00"));

    setStartDate(new Date(startDateParam + "T07:30:00-04:00"));
    setEndDate(new Date(endDateParam + "T07:30:00-04:00"));
    console.log(startDateParam);
  }, []);

  useEffect(() => {
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

    const chartData = {
      labels: ["Revenue", "Loss"],
      datasets: [
        {
          data: [revenue, loss],
          backgroundColor: ["#8A9A5B", "pink"],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      width: "50vw", // Set the width to 50vw
      height: "50vh", // Set the height to 50vh
    };

    return { ...chartData, options: chartOptions };
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
      <div className="tab-container">
        <div
          className={`tab-item ${totalTab ? "active" : ""}`}
          onClick={() => setTotalTab(true)}
        >
          Total Report
        </div>
        <div
          className={`tab-item ${!totalTab ? "active" : ""}`}
          onClick={() => setTotalTab(false)}
        >
          Day by Day Report
        </div>
      </div>
      {totalTab ? (
        <div className="information">
          <h2 id="total-report-title">Total Report</h2>
          <div id="total-report">
            <div className="total-report-item">
              {Object.entries(genReport.TOTALREPORT).map(([key, value]) => {
                const labelMapping = {
                  date: "Date",
                  revenue: "Revenue",
                  loss: "Loss",
                  revenueNumSmallCar: "Processed Compact Cars",
                  revenueNumMediumCar: "Processed Medium Cars",
                  revenueNumBigCar: "Processed Full-Size Cars",
                  revenueNumTruck1: "Processed Type 1 Trucks",
                  revenueNumTruck2: "Processed Type 2 Trucks",
                  lossNumSmallCar: "Turned-Away Compact Cars",
                  lossNumMediumCar: "Turned-Away Medium Cars",
                  lossNumBigCar: "Turned-Away Full-Size Cars",
                  lossNumTruck1: "Turned-Away Type 1 Trucks",
                  lossNumTruck2: "Turned-Away Type 2 Trucks",
                };

                return (
                  value !== 0 && (
                    <div key={key} className="report-item">
                      <span className="report-key">{labelMapping[key]}:</span>
                      <span className="report-value">{value}</span>
                    </div>
                  )
                );
              })}
            </div>
          </div>
          <div id="graph">
            <Doughnut data={getChartData(genReport.TOTALREPORT)} />
          </div>
        </div>
      ) : (
        <div className="dayday">
          {genReport.DAYREPORTARRAY.map((dayReport) => (
            <div
              className="daydayblock-expanded"
              key={dayReport.date}
              onClick={() => handleDayClick(dayReport)}
            >
              <h3>Date: {dayReport.date}</h3>
              <div>
                <p>Revenue: {dayReport.revenue}</p>
                <p>Loss: {dayReport.loss}</p>
                {/* ... other properties from DAYREPORT */}
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
              <div className="report-container">
                {Object.entries(selectedDayReport).map(([key, value]) => {
                  const labelMapping = {
                    date: "Date",
                    revenue: "Revenue",
                    loss: "Loss",
                    revenueNumSmallCar: "Processed Compact Cars",
                    revenueNumMediumCar: "Processed Medium Cars",
                    revenueNumBigCar: "Processed Full-Size Cars",
                    revenueNumTruck1: "Processed Type 1 Trucks",
                    revenueNumTruck2: "Processed Type 2 Trucks",
                    lossNumSmallCar: "Turned-Away Compact Cars",
                    lossNumMediumCar: "Turned-Away Medium Cars",
                    lossNumBigCar: "Turned-Away Full-Size Cars",
                    lossNumTruck1: "Turned-Away Type 1 Trucks",
                    lossNumTruck2: "Turned-Away Type 2 Trucks",
                  };

                  return (
                    value !== 0 && (
                      <div key={key} className="report-item">
                        <span className="report-key">{labelMapping[key]}:</span>
                        <span className="report-value">{value}</span>
                      </div>
                    )
                  );
                })}
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
