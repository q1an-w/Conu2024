export const generateReport = (rangeData) => {
  const SMALLCARINFO = {
    servicingTime: 30,
    charge: 150,
  };
  const MEDIUMCARINFO = {
    servicingTime: 30,
    charge: 150,
  };
  const BIGCARINFO = {
    servicingTime: 30,
    charge: 150,
  };
  const CLASS1TRUCK = {
    servicingTime: 60,
    charge: 250,
  };
  const CLASS2TRUCK = {
    servicingTime: 120,
    charge: 700,
  };
  const DAYREPORTARRAY = [];
  const DAYREPORT = {
    date: "",
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
  };
  const TOTALREPORT = {
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
  };
  const BAYARRAY = [
    { id: 1, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
    { id: 2, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
    { id: 3, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
    { id: 4, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
    { id: 5, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
    { id: 6, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
    { id: 7, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
    { id: 8, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
    { id: 9, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
    { id: 10, isFree: true, type: null, timeWhenFree: null, isWalkIn: false },
  ];

  let currentTime = rangeData[0].apptDate;
  let currentDayReport = { ...DAYREPORT }; // Initialize currentDayReport

  //foreach functions --------------------------------------------------
  //--------------------------------------------------
  //--------------------------------------------------
  // ... (Previous code remains unchanged)
  const getMappedCVSCategoryName = (category) => {
    // Define your mapping logic here
    switch (category.toLowerCase()) {
      case "compact":
        return "SmallCar";
      case "medium":
        return "MediumCar";
      case "full-size":
        return "BigCar";
      case "class 1 truck":
        return "Truck1";
      case "class 2 truck":
        return "Truck2";
      default:
        return "UnknownCategory";
    }
  };
  const getCategoryInfo = (category) => {
    switch (category) {
      case "SmallCar":
        return SMALLCARINFO;
      case "MediumCar":
        return MEDIUMCARINFO;
      case "BigCar":
        return BIGCARINFO;
      case "Truck1":
        return CLASS1TRUCK;
      case "Truck2":
        return CLASS2TRUCK;
      default:
        return {};
    }
  };

  const updateTotalReport = (vehicle, isRevenue) => {
    const { category } = vehicle;
    const mappedCategory = getMappedCVSCategoryName(category);
    const revenueKey = isRevenue ? "revenue" : "loss";
    const revenueNumKey = isRevenue
      ? `revenueNum${mappedCategory}`
      : `lossNum${mappedCategory}`;

    const { servicingTime, charge } = getCategoryInfo(mappedCategory);

    TOTALREPORT[revenueKey] += charge;
    TOTALREPORT[revenueNumKey]++;
  };

  const updateDayReport = (vehicle, isRevenue) => {
    const { category } = vehicle;
    const mappedCategory = getMappedCVSCategoryName(category);
    const revenueKey = isRevenue ? "revenue" : "loss";
    const revenueNumKey = isRevenue
      ? `revenueNum${mappedCategory}`
      : `lossNum${mappedCategory}`;

    const { servicingTime, charge } = getCategoryInfo(mappedCategory);

    currentDayReport[revenueKey] += charge;
    currentDayReport[revenueNumKey]++;
  };
  const isWalkIn = (callDate, apptDate) => {
    return callDate.getTime() === apptDate.getTime();
  };

  const isWalkInBayAvailable = (vehicle) => {
    const { category } = vehicle;
    const walkInBays = BAYARRAY.filter(
      (bay) => !bay.isFree && bay.isWalkIn && bay.type === category
    ).length;
    const freeBays = BAYARRAY.filter((bay) => bay.isFree).length;

    if (walkInBays === 0 && freeBays >= 1) {
      return true; // No walk-in of the same type exists, and there is at least one free spot
    } else if (walkInBays > 0 && freeBays - walkInBays >= 1) {
      return true; // Walk-ins of the same type exist, but there are enough free spots
    } else {
      return false; // No available bay for the walk-in
    }
  };

  const isReservedBayAvailable = (category) => {
    const freeBays = BAYARRAY.filter((bay) => bay.isFree).length;
    const takenWalkInSpots = BAYARRAY.filter(
      (bay) => !bay.isFree && bay.isWalkIn && bay.type === category
    ).length;

    return freeBays + takenWalkInSpots > 5;
  };

  const setBayInfo = (vehicle, addBlock, isWalkin) => {
    const { category } = vehicle;

    const availableBay = BAYARRAY.find(
      (bay) => bay.isFree && (!isWalkin || !bay.isWalkIn)
    );

    if (availableBay) {
      if (addBlock) {
        // Block the bay
        availableBay.isFree = false;
        availableBay.type = category;
        availableBay.timeWhenFree = new Date(
          vehicle.apptDate.getTime() +
            getCategoryInfo(getMappedCVSCategoryName(category)).servicingTime *
              60000
        );
        availableBay.isWalkIn = isWalkin;
      } else {
        // Free the bay
        availableBay.isFree = true;
        availableBay.type = null;
        availableBay.timeWhenFree = null;
        availableBay.isWalkIn = false;
      }
    }
  };
  const updateBays = (currentTime) => {
    BAYARRAY.forEach((bay) => {
      if (!bay.isFree && bay.timeWhenFree) {
        if (currentTime >= bay.timeWhenFree) {
          bay.isFree = true;
          bay.type = null;
          bay.timeWhenFree = null;
          bay.isWalkIn = false;
        }
      }
    });
  };

  //--------------------------------------------------
  //--------------------------------------------------
  //loop

  rangeData.forEach((vehicle) => {
    const { callDate, apptDate, category } = vehicle;

    // Check if it's a new day
    if (apptDate.getDate() !== currentTime.getDate()) {
      currentDayReport.date = currentTime.toISOString().split("T")[0];
      DAYREPORTARRAY.push({ ...currentDayReport }); // Add the current day report to the array
      currentDayReport = { ...DAYREPORT }; // Reset day report
      BAYARRAY.forEach((bay) => {
        bay.isFree = true;
        bay.type = null;
        bay.timeWhenFree = null;
        bay.isWalkIn = false;
      });
    }
    currentTime = apptDate;

    updateBays(currentTime);
    const isWalkInFlag = isWalkIn(callDate, apptDate);

    if (isWalkInFlag) {
      if (isWalkInBayAvailable(vehicle)) {
        setBayInfo(vehicle, true, true);
        updateDayReport(vehicle, true);
        updateTotalReport(vehicle, true);
      } else {
        // console.log("walkin");
        // console.log(vehicle);
        // console.log("walkin");
        updateDayReport(vehicle, false);
        updateTotalReport(vehicle, false);
      }
    } else {
      if (isReservedBayAvailable(vehicle)) {
        setBayInfo(vehicle, true, false);
        updateDayReport(vehicle, true);
        updateTotalReport(vehicle, true);
      } else {
        // console.log("not walkin");
        // console.log(vehicle);
        // console.log("not walkin");
        updateDayReport(vehicle, false);
        updateTotalReport(vehicle, false);
      }
    }
  });
  currentDayReport.date = currentTime.toISOString().split("T")[0];
  DAYREPORTARRAY.push({ ...currentDayReport });
  console.log(TOTALREPORT);

  return {
    TOTALREPORT,
    DAYREPORTARRAY,
  };
};
