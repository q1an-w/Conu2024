// utility/parseCsv.js

import Papa from "papaparse";

export const parseAndSortCsvFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const csvData = event.target.result;

      Papa.parse(csvData, {
        header: false,
        dynamicTyping: true,
        complete: (result) => {
          const parsedData = result.data.map((row) => ({
            startDate: new Date(row[0]),
            endDate: new Date(row[1]),
            category: row[2],
          }));

          // Sort the array by startDate
          parsedData.sort((a, b) => a.startDate - b.startDate);

          resolve(parsedData);
        },
        error: (error) => {
          reject(error.message);
        },
      });
    };

    reader.readAsText(file);
  });
};
