
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

function adjustCounts(data: BlotterMetaData, listOfDates: string[]): BlotterMetaData {
  const newData: BlotterMetaData = {
      totalCount: data.totalCount,
      details: []
  };

  let extraCount = 0;

  for (const detail of data.details) {
      if (!listOfDates.includes(detail.submissionDate)) {
          extraCount += detail.count;
      } else {
          newData.details.push({ ...detail, count: detail.count + extraCount });
          extraCount = 0;
      }
  }

  return newData;
}


function adjustCounts(data: BlotterMetaData, listOfDates: string[]): BlotterMetaData {
  const { details } = data;

  details.forEach((currentDetail, index) => {
      const currentDate = currentDetail.submissionDate;
      const nextDetail = details[index + 1];
      const nextDate = nextDetail ? nextDetail.submissionDate : null;

      if (nextDate && !listOfDates.includes(currentDate) && listOfDates.includes(nextDate)) {
          const currentIndex = listOfDates.indexOf(nextDate);
          details[currentIndex - 1].count += currentDetail.count;
          details.splice(index, 1);
      }
  });

  return data;
}
