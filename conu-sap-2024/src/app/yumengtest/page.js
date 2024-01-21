"use client";
import { truncateParsedData } from "../utility/truncateData.js";
import { useEffect, useState } from "react";

const startDate = new Date(
  "Wed Oct 05 2022 14:22:00 GMT-0400 (Eastern Daylight Time)"
);
const endDate = new Date(
  "Thu Oct 06 2022 09:30:00 GMT-0400 (Eastern Daylight Time)"
);

const YourPage = () => {
  const [sortedData, setSortedData] = useState([]);

  const getFileData = async () => {
    try {
      const truncatedData = await truncateParsedData(startDate, endDate);

      console.log(truncatedData);
      setSortedData(truncatedData);
    } catch (error) {
      console.error("Error truncating data:", error);
    }
  };

  useEffect(() => {
    // Uncomment the line below if you want to load data initially
    // handleFileChange();
  }, []);

  return (
    <div>
      <h1>Date-truncated CSV Data</h1>
      <button onClick={getFileData}>Load Truncated CSV Data</button>

      <ul>
        {sortedData.map((item, index) => (
          <li key={index}>
            {`Requested Call Date/Time: ${item.callDate}, Requested Appointment Date/Time: ${item.apptDate}, Vehicle Type: ${item.category}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourPage;
