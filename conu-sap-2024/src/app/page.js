"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import { truncateParsedData } from "./utility/truncateData";
import Link from "next/link";

function App() {
  "use client";
  const initialStartDate = new Date("2022-10-01T07:30:00-04:00");
  const initialEndDate = new Date("2022-11-30T07:30:00-04:00");
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [animateCar, setAnimateCar] = useState(false);
  // let parallaxStyle = submitted
  //   ? {
  //       transform: `translate(-75rem, -80rem) rotate(30deg)`, // Adjust values for desired effect
  //       transition: "transform 1s ease, opacity 1s ease",
  //     }
  //   : {
  //       transform: `rotate(20deg) translateX(${
  //         (mousePosition.x /
  //           (window?.innerWidth || document.documentElement.clientWidth)) *
  //           3 -
  //         25
  //       }rem) translateY(${
  //         (mousePosition.y /
  //           (window?.innerHeight || document.documentElement.clientHeight)) *
  //           3 -
  //         50
  //       }rem)`,
  //       opacity: 0.4,
  //     };
  // let parallaxStyle;
  // parallaxStyle = {
  //   transform: `rotate(20deg) translateX(${
  //     (mousePosition.x /
  //       (window?.innerWidth || document.documentElement.clientWidth)) *
  //       3 -
  //     25
  //   }rem) translateY(${
  //     (mousePosition.y /
  //       (window?.innerHeight || document.documentElement.clientHeight)) *
  //       3 -
  //     50
  //   }rem)`,
  //   opacity: 0.4,
  // };
  useEffect(() => {
    setAnimateCar(true);
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
  let parallaxStyle;
  if (typeof window !== "undefined") {
    parallaxStyle = submitted
      ? {
          transform: `translate(-175rem, -80rem) rotate(30deg)`, // Adjust values for desired effect
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
            50
          }rem)`,
          opacity: 0.4,
        };
  }
  let carparallaxStyle;
  if (typeof window !== "undefined") {
    carparallaxStyle = animateCar
    carparallaxStyle = {
      transform: animateCar ? `translateX(0)` : `translateX(-100%)`,

    };

    carparallaxStyle = submitted
      ? {
          transform: `translate(-175rem, -80rem) rotate(30deg)`, // Adjust values for desired effect
          transition: "transform 1s ease, opacity 1s ease",
        }
      : {
          transform: `rotate(20deg) translateX(${
            (mousePosition.x /
              (window?.innerWidth || document.documentElement.clientWidth)) *
              3 -
            10
          }rem) translateY(${
            (mousePosition.y /
              (window?.innerHeight || document.documentElement.clientHeight)) *
              3 -
            15
          }rem)`,
          opacity: 0.4,
        };
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hi");
    const dateRange = {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
    // const res = await dateRangeAPICall(startDate, endDate);
    // console.log(res);
    setSubmitted(true);
    // parallaxStyle = {
    //   transform: `translate(-75rem, -80rem) rotate(30deg)`, // Adjust values for desired effect
    //   transition: "transform 1s ease, opacity 1s ease",
    // };

    const queryParams = new URLSearchParams({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = `/report?${queryParams.toString()}`;
      }
      // Replace '/another-page' with the URL you want to navigate to

      // window.location.href = "/report";
    }, 1000);
  };
  // const dateRangeAPICall = async (startDate, endDate) => {
  //   try {
  //     // Make a POST request to the API endpoint
  //     const response = await fetch("/api/dateRange", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ startdate, enddate }),
  //     });

  //     // Check if the request was successful
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("POST request successful:", data);
  //     } else {
  //       console.error("POST request failed:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error making POST request:", error.message);
  //   }
  // };

  // date validation
  const isDateValid = (date) => {
    // Function to check if a date is within the specified range
    const minDate = new Date("2022-10-01");
    const maxDate = new Date("2022-11-30");

    return date >= minDate && date <= maxDate;
  };

  return (
    <div className="App">
      <p className="welcome">welcome</p>
      <div className="wallpaper" style={parallaxStyle}></div>
      <div className="car" style={carparallaxStyle}></div>
      {!submitted && (
        <form className="calendar" onSubmit={handleSubmit}>
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

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
