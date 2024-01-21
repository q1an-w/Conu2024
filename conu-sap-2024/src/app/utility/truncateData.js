import { parseAndSortCsvFile } from "./parseCsv.js";

export const truncateParsedData = async (startDate, endDate) => {
  // Initialize array for truncated data
  const truncatedData = [];

  try {
    // Get parsed data
    const parsedData = await parseAndSortCsvFile();

    // Iterate through the parsed data
    parsedData.forEach((entry) => {
      const apptDate = entry.apptDate;

      // append entry to truncatedData
      if (apptDate >= startDate && apptDate <= endDate) {
        truncatedData.push(entry);
      }
      // else do nothing
    });
  } catch (error) {
    console.error("Error fetching or parsing CSV file:", error);
  }

  // Return truncatedDate
  return truncatedData;
};
