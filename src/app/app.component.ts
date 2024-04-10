
// I want to write a function such that

// it will have two parameters as arguments

// 'data' of type BlotterMetaData and 'listOfDates' of type string[]

// export interface BlotterMetaData {
// totalCount: number;
// details: Details[];
// fetchedCount: number;
// }

// export interface Detail {
// submissionDate: string;
// count: number;
// }


// If input for

// data = {
// details: [
// { submissionDate: '2024-04-08' , count: 1302 },
// { submissionDate: '2024-04-09' , count: 1126 },
// { submissionDate: '2024-04-10' , count: 47 },
// ],
// totalCount: 2475
// }

// and input for list of dates = ['2024-04-08', '2024-04-09']

// I want output as

// data = {
// details: [
// { submissionDate: '2024-04-08' , count: 1302 },
// { submissionDate: '2024-04-09' , count: 1173 },
// ],
// totalCount: 2475
// }

// logic behind above is if extra date in data which in above case is  2024-04-10 is bigger than 2024-04-09

// it should add  2024-04-10 date count which is 47 to count of 2024-04-09 which is 1126 and produce output like

// data = {
// details: [
// { submissionDate: '2024-04-08' , count: 1302 },
// { submissionDate: '2024-04-09' , count: 1173 },
// ],
// totalCount: 2475
// }


// also if input like

// data = {
// details: [
// { submissionDate: '2024-04-07' , count: 55 },
// { submissionDate: '2024-04-08' , count: 2118 },
// { submissionDate: '2024-04-09' , count: 1014},
// ],
// totalCount: 3187
// }

// and listOfDates = [2024-04-08, 2024-04-09 ]

// I want output as

// data = {
// details: [
// { submissionDate: '2024-04-08' , count: 2173 },
// { submissionDate: '2024-04-09' , count: 1014 },
// ],
// totalCount: 3187
// }

// logic behind above is if extra date in data which in above case is  2024-04-07 is less than 2024-04-08

// it should add  2024-04-07 date count which is 55 to count of 2024-04-08 which is 2118 and produce output like

// data = {
// details: [
// { submissionDate: '2024-04-08' , count: 2173 },
// { submissionDate: '2024-04-09' , count: 1014 },
// ],
// totalCount: 3187
// }


function updateDetails(data: BlotterMetaData, listOfDates: string[]): BlotterMetaData {
  let updatedDetails: Detail[] = [];
  let extraCount = 0; // To accumulate counts of dates not in the listOfDates.

  data.details.forEach((detail) => {
      if (listOfDates.includes(detail.submissionDate)) {
          // If the submissionDate is in listOfDates, we simply push it to updatedDetails.
          updatedDetails.push(detail);
      } else {
          // If not, we add its count to extraCount.
          extraCount += detail.count;
      }
  });

  // If there is any extraCount, add it to the last date in the listOfDates that is present in updatedDetails.
  if (extraCount > 0 && updatedDetails.length > 0) {
      let lastValidDateIndex = updatedDetails.findIndex(detail => detail.submissionDate === listOfDates[listOfDates.length - 1]);
      if (lastValidDateIndex !== -1) {
          updatedDetails[lastValidDateIndex].count += extraCount;
      }
  }

  // Return new data object with updated details and totalCount (unchanged).
  return {
      ...data,
      details: updatedDetails,
  };
}

// Example usage:
const data = {
  details: [
      { submissionDate: '2024-04-08', count: 10 },
      { submissionDate: '2024-04-09', count: 20 },
      { submissionDate: '2024-04-10', count: 5 },
  ],
  totalCount: 35,
};

const listOfDates = ['2024-04-08', '2024-04-09'];
const updatedData = updateDetails(data, listOfDates);

console.log(updatedData);


function updateDetails(data: BlotterMetaData, listOfDates: string[]): BlotterMetaData {
  let updatedDetails: Detail[] = [];
  let extraCount = 0; // To accumulate counts of dates not in the listOfDates.

  // Iterate through each detail
  data.details.forEach((detail) => {
      if (listOfDates.includes(detail.submissionDate)) {
          // If the submissionDate is in listOfDates, add it to updatedDetails
          updatedDetails.push(detail);
      } else {
          // If not, add its count to extraCount
          extraCount += detail.count;
      }
  });

  // If there is any extraCount, add it to the count of the last valid date in updatedDetails
  if (extraCount > 0 && updatedDetails.length > 0) {
      // Assuming the last date in listOfDates is the one to get the extra counts
      let lastValidDate = listOfDates[listOfDates.length - 1];
      let lastValidDetail = updatedDetails.find(detail => detail.submissionDate === lastValidDate);
      if (lastValidDetail) {
          lastValidDetail.count += extraCount;
      } else {
          // If the last date in listOfDates wasn't initially in the details but needs to receive extra counts
          updatedDetails.push({ submissionDate: lastValidDate, count: extraCount });
      }
  }

  return {
      ...data,
      details: updatedDetails,
  };
