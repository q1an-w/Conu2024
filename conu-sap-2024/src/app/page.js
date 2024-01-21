"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import { truncateParsedData } from "./utility/truncateData";

function App() {
  const initialStartDate = new Date("2022-10-01T07:30:00-04:00");
  const initialEndDate = new Date("2022-11-30T07:30:00-04:00");
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [submitted, setSubmitted] = useState(false);
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
        transform: `translate(-75rem, -80rem) rotate(30deg)`, // Adjust values for desired effect
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
  // useEffect(() => {
  //   console.log(submitted);

  //   parallaxStyle = submitted
  //     ? {
  //         transform: `translate(-75rem, -80rem) rotate(30deg)`, // Adjust values for desired effect
  //         transition: "transform 1s ease, opacity 1s ease",
  //       }
  //     : {
  //         transform: `rotate(20deg) translateX(${
  //           (mousePosition.x /
  //             (window?.innerWidth || document.documentElement.clientWidth)) *
  //             3 -
  //           25
  //         }rem) translateY(${
  //           (mousePosition.y /
  //             (window?.innerHeight || document.documentElement.clientHeight)) *
  //             3 -
  //           50
  //         }rem)`,
  //         opacity: 0.4,
  //       };
  //   console.log(parallaxStyle);
  // }, [submitted]);

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
      // Replace '/another-page' with the URL you want to navigate to
      window.location.href = `/report?${queryParams.toString()}`;
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

  const isDateValid = (date) => {
    // Function to check if a date is within the specified range
    const minDate = new Date("2022-10-01");
    const maxDate = new Date("2022-11-30");

    return date >= minDate && date <= maxDate;
  };

  return (
    <div className="App">
      <p
        className="welcome"
        style={{ opacity: submitted ? 0 : 1, transition: "opacity 1s ease" }}
      >
        welcome.
      </p>
      <div className="wallpaper" style={parallaxStyle}></div>
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
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
