// pages/index.js
"use client";
// pages/index.js
import { parseAndSortCsvFile } from "../utility/parseCsv.js";
import { useEffect, useState } from "react";

const YourPage = () => {
  const [sortedData, setSortedData] = useState([]);

  const getFileData = async () => {
    try {
      const parsedData = await parseAndSortCsvFile(); //yumeng remmebr this is how to get the raw sorted data

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
      <button onClick={getFileData}>Load CSV Data</button>

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
