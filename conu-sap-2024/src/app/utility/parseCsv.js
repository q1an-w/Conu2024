import Papa from "papaparse";

export const parseAndSortCsvFile = async () => {
  const csvFilePath = "../database/datafile.csv";
  const response = await fetch(csvFilePath);
  const csvContent = await response.text();

  const blob = new Blob([csvContent], { type: "text/csv" });
  const file = new File([blob], "sample.csv", { type: "text/csv" });
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const csvData = event.target.result;

      Papa.parse(csvData, {
        header: false,
        dynamicTyping: true,
        complete: (result) => {
          const parsedData = result.data.map((row) => ({
            callDate: parseCustomDate(row[0]),
            apptDate: parseCustomDate(row[1]),
            category: row[2],
          }));

          parsedData.sort((a, b) => {
            const apptDateDiff = a.apptDate - b.apptDate;
            return apptDateDiff !== 0 ? apptDateDiff : a.callDate - b.callDate;
          });
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

const parseCustomDate = (dateString) => {
  if (!dateString) {
    return null;
  }
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");
  return new Date(year, month - 1, day, hours, minutes);
};
