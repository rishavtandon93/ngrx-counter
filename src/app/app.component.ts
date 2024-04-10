
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

function adjustBlotterData(data: BlotterMetaData, listOfDates: string[]): BlotterMetaData {
  // Create a copy of the original data to avoid unintended side effects
  const adjustedData = { ...data };

  const detailsMap = new Map<string, number>(); // Use a map for efficient lookups

  // Populate the map with counts for each date in the original details
  for (const detail of data.details) {
    detailsMap.set(detail.submissionDate, detail.count);
  }

  // Iterate through listOfDates
  for (const date of listOfDates) {
    const count = detailsMap.get(date) || 0; // Get existing count or default to 0
    detailsMap.set(date, count); // Update or add the count for this date

    // If the date in listOfDates is after the last date in adjustedData.details
    const lastDetailDate = adjustedData.details.length > 0 ? adjustedData.details[adjustedData.details.length - 1].submissionDate : undefined;
    if (lastDetailDate && new Date(date).getTime() > new Date(lastDetailDate).getTime()) {
      // Find the detail in adjustedData.details with the closest submissionDate before the current date
      let closestDetailIndex = adjustedData.details.length - 1;
      while (closestDetailIndex >= 0 && new Date(adjustedData.details[closestDetailIndex].submissionDate).getTime() > new Date(date).getTime()) {
        closestDetailIndex--;
      }

      // If a closest detail is found, update its count with the combined count
      if (closestDetailIndex >= 0) {
        adjustedData.details[closestDetailIndex].count += detailsMap.get(date);
      } else {
        // If no closest detail is found, add a new detail for the current date
        adjustedData.details.push({ submissionDate: date, count: detailsMap.get(date) });
      }
    }
  }

  return adjustedData;
}
