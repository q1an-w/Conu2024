// pages/index.js
"use client";
// pages/index.js
import { parseAndSortCsvFile } from "../utility/parseCsv.js";
import { useEffect, useState } from "react";

const YourPage = () => {
  const [sortedData, setSortedData] = useState([]);

  const csvFilePath = "../database/datafile.csv"; // Your CSV data goes here

  const handleFileChange = async () => {
    try {
      const response = await fetch(csvFilePath);
      const csvContent = await response.text();

      const blob = new Blob([csvContent], { type: "text/csv" });
      const fakeFile = new File([blob], "sample.csv", { type: "text/csv" });

      const parsedData = await parseAndSortCsvFile(fakeFile);

      console.log(parsedData);
      setSortedData(parsedData);
    } catch (error) {
      console.error("Error fetching or parsing CSV file:", error);
    }
  };

  useEffect(() => {
    // Uncomment the line below if you want to load data initially
    // handleFileChange();
  }, []);

  return (
    <div>
      <h1>Date-sorted CSV Data</h1>
      <button onClick={handleFileChange}>Load CSV Data</button>

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
