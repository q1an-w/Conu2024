// pages/index.js
"use client";
import { get } from "https";
// pages/index.js
import { parseAndSortCsvFile } from "../utility/parseCsv.js";
import { generateReport } from "../utility/reportGenerater.js";
import { useEffect, useState } from "react";

const YourPage = () => {
  const [sortedData, setSortedData] = useState([]);
  const [testReportGen, setTestReportGen] = useState([]);
  const [report, setReport] = useState({});

  useEffect(() => {
    const getFileData = async () => {
      try {
        const parsedData = await parseAndSortCsvFile(); //yumeng remmebr this is how to get the raw sorted data
        console.log(parsedData);
        setSortedData(parsedData);
        const genReport = await generateReport(parsedData.slice(0, 20));
        console.log(genReport);
      } catch (error) {
        console.error("Error fetching or parsing CSV file:", error);
      }
    };

    getFileData();
  }, []);

  return (
    <div>
      <h1>Date-sorted CSV Data</h1>
      {/* <div>{sortedData[1].apptDate.toDateString()}</div>
      <div>{sortedData[1].apptDate.toTimeString()}</div> */}
      {/* <div>{`${sortedData[0].apptDate}`}</div> */}
      <div> --------</div>

      <ul>
        {sortedData.slice(11, 20).map((item, index) => (
          <li style={{ marginTop: "15px", fontSize: "20px" }} key={index}>
            {`Call:         ${item.callDate}, Appt:          ${item.apptDate}, Vehicle Type:      ${item.category}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourPage;
