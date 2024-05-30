import { Component, OnInit } from '@angular/core';
import {
  Observable,
  combineLatest,
  distinctUntilChanged,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { BlotterMetaData, Detail } from './enums';
export interface LanguageSpecficProductNameValues {
  [language: string]: string;
}

export interface LanguageSpecficProductNamePayload {
  defaultLanguage: string;
  languageSpecficProductName: LanguageSpecficProductNameValues[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'NgRx_Counter';

  data: BlotterMetaData = {
    details: [
      { submissionDate: '2024-04-08', count: 10 },
      { submissionDate: '2024-04-09', count: 20 },
      { submissionDate: '2024-04-10', count: 5 },
    ],
    totalCount: 35,
  };

  data2: BlotterMetaData = {
    details: [
      { submissionDate: '2024-04-07', count: 1 },
      { submissionDate: '2024-04-08', count: 5 },
      { submissionDate: '2024-04-09', count: 10 },
    ],
    totalCount: 16,
  };

  listOfDates = ['2024-04-08', '2024-04-09'];

  data3: BlotterMetaData = {
    details: [
      { submissionDate: '2024-04-07', count: 1 },
      { submissionDate: '2024-04-08', count: 5 },
      { submissionDate: '2024-04-09', count: 10 },
      { submissionDate: '2024-04-10', count: 15 },
    ],
    totalCount: 31,
  };

  data4: BlotterMetaData = {
    details: [
      { submissionDate: '2024-04-08', count: 1 },
      { submissionDate: '2024-04-09', count: 5 },
      { submissionDate: '2024-04-10', count: 10 },
      { submissionDate: '2024-04-11', count: 15 },
    ],
    totalCount: 31,
  };

  listOfDates2 = ['2024-04-08', '2024-04-09', '2024-04-10'];

  data5: BlotterMetaData = {
    details: [
      { submissionDate: '2024-04-07', count: 100 },
      { submissionDate: '2024-04-08', count: 50 },
    ],
    totalCount: 150,
  };

  listOfDates3 = ['2024-04-08'];

  ngOnInit(): void {
    this.updateDetailsClean(this.data5, this.listOfDates3);
  }

  updateDetails(data: BlotterMetaData, listOfDates: string[]): any {
    // Prepare a container for updated details. Initially empty.
    let updatedDetails: any[] = [];

    // Track the index in updatedDetails where the last date's count should be added to.
    let lastIndexOfValidDate = -1;

    // Iterate over each detail in the original data.
    data.details.forEach((detail) => {
      if (listOfDates.includes(detail.submissionDate)) {
        // If the date is in listOfDates, add it directly to updatedDetails.
        updatedDetails.push(detail);
        lastIndexOfValidDate = updatedDetails.length - 1; // Update the index to the latest valid date.
      } else {
        // For dates not in listOfDates, add their count to the last valid detail's count, if any.
        if (lastIndexOfValidDate !== -1) {
          updatedDetails[lastIndexOfValidDate].count += detail.count;
        }
      }
    });

    // Return the updated BlotterMetaData object, keeping totalCount the same as input.
    const output = {
      ...data,
      details: updatedDetails,
    };

    console.log(output);
  }

  updateDetailsNew(data: BlotterMetaData, listOfDates: string[]): void {
    let updatedDetails: Detail[] = data.details.filter((detail) =>
      listOfDates.includes(detail.submissionDate)
    );
    let extraCountBefore = 0;
    let extraCountAfter = 0;
    let maxDateInList = new Date(
      Math.max(...listOfDates.map((date) => new Date(date).getTime()))
    );

    data.details.forEach((detail) => {
      if (!listOfDates.includes(detail.submissionDate)) {
        const detailDate = new Date(detail.submissionDate);
        if (detailDate <= maxDateInList) {
          extraCountBefore += detail.count;
        } else {
          extraCountAfter += detail.count;
        }
      }
    });

    if (updatedDetails.length > 0) {
      // Add counts from dates before the maxDateInList to the first date in updatedDetails
      if (extraCountBefore > 0) {
        updatedDetails[0].count += extraCountBefore;
      }

      // Add counts from dates after the maxDateInList to the last date in updatedDetails
      if (extraCountAfter > 0) {
        updatedDetails[updatedDetails.length - 1].count += extraCountAfter;
      }
    }

    const output = {
      ...data,
      details: updatedDetails,
    };
    console.log(output);
  }

  updateDetailsClean(data: BlotterMetaData, listOfDates: string[]): void {
    const dateTimestamps = new Set(
      listOfDates.map((date) => new Date(date).getTime())
    );
    const maxDateInListTimestamp = Math.max(...dateTimestamps);

    let extraCountBefore = 0;
    let extraCountAfter = 0;

    const updatedDetails = data.details.reduce((acc, detail) => {
      const detailTimestamp = new Date(detail.submissionDate).getTime();

      if (dateTimestamps.has(detailTimestamp)) {
        acc.push(detail); // Retain matching details
      } else {
        // Accumulate counts before or after the max date in the list
        detailTimestamp <= maxDateInListTimestamp
          ? (extraCountBefore += detail.count)
          : (extraCountAfter += detail.count);
      }

      return acc;
    }, [] as Detail[]);

    if (updatedDetails.length) {
      // Distribute extra counts among the first and last updated details
      updatedDetails[0].count += extraCountBefore;
      updatedDetails[updatedDetails.length - 1].count += extraCountAfter;
    }

    console.log({ ...data, details: updatedDetails });
  }

  getDynamicEmailTemplate(): void {
    this.cdeskblotterEmailService.getQuoteIds().pipe(
      withLatestFrom(this.gridStatesServie.activeSate$),
      first(),
      map(([ids, gridSate]) => ({ ids, gridSate }))
    );
  }

  getDynamicEmailTemplateNew(
    quoteIds: string[],
    state: GridSate,
    selectedEmailTemplate: string
  ): Observable<HttpRequestState<String>> {
    const data = {
      quoteIds,
      layout: state,
    };

    return httpMappers.mapToHttpRequestState<string>(
      this.appConfigService.getInsightHost().pipe(
        first(),
        map((insightHost: string) =>
          insightUrls.getInitialDynamicHtmlTemplate(
            insightHost,
            selectedEmailTemplate
          )
        ),
        switchMap((url: string) =>
          this.http.post<string>(url, data, {
            responseType: 'text' as 'json',
          })
        )
      )
    );
  }
}
`


this.refresh$.pipe(
  startWith(null), // Trigger the stream initially
  withLatestFrom(this.haloId$),
  map(([_, haloId]) => haloId),
  takeUntil(this.destroyed$)
).subscribe((quoteId: string) => {
  this.quoteId = quoteId;
  this.getFeedbackOptions(quoteId);
});
