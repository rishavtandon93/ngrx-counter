import { Component, OnInit } from '@angular/core';
import { combineLatest, distinctUntilChanged, map, withLatestFrom } from 'rxjs';
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

  constructor() {
    this.example();
  }

  ngOnInit(): void {}

  example() {
    let result: LanguageSpecficProductNameValues[] = [
      { EN: 'abc' },
      { DE: 'gef' },
      { ESP: 'abc' },
    ];

    let languages = ['EN', 'DE', 'ESP', 'CS'];

    languages.forEach((language) => {
      if (!result.some((obj) => obj[language] !== undefined)) {
        result.push({ [language]: '' });
      } else if (result.some((obj) => obj[language] === '')) {
        result.forEach((obj) => {
          if (obj[language] === '') {
            obj[language] = 'newValue'; // Replace 'newValue' with the desired value
          }
        });
      }
    });

    console.log(result);

    languages.push('FR');

    languages.forEach((language) => {
      if (!result.some((obj) => obj[language] !== undefined)) {
        result.push({ [language]: '' });
      } else if (result.some((obj) => obj[language] === '')) {
        result.forEach((obj) => {
          if (obj[language] === '') {
            obj[language] = ''; // Replace 'newValue' with the desired value
          }
        });
      }
    });

    console.log(result);
  }

  // example() {
  //   //const val1: any = this.getValue(undefined) === undefined ? 0 : this.getValue(4);
  //   const val1: any = this.getValue(undefined) || 0;
  //   console.log(val1);
  // }

  getValue(value: any) {
    return value;
  }

  updateResultArray(
    result: { [key: string]: string }[],
    languages: string[]
  ): void {
    // Remove languages that exist in languages array but not in result array
    languages
      .filter((language) => !result.some((obj) => obj.hasOwnProperty(language)))
      .forEach((languageToRemove) => {
        const indexToRemove = languages.indexOf(languageToRemove);
        if (indexToRemove !== -1) {
          languages.splice(indexToRemove, 1);
        }
      });

    // Add new objects for missing languages in result array
    languages.forEach((language) => {
      if (!result.some((obj) => obj[language] !== undefined)) {
        result.push({ [language]: '' });
      } else if (result.some((obj) => obj[language] === '')) {
        result.forEach((obj) => {
          if (obj[language] === '') {
            obj[language] = 'newValue'; // Replace 'newValue' with the desired value
          }
        });
      }
    });
  }

  addLanguageToProductName(
    selectLanguages: string[],
    selectedLanguageWithProductName: LanguageSpecficProductNameValues[],
    defaultProductName: string
  ): LanguageSpecficProductNameValues[] {
    return [
      ...selectedLanguageWithProductName,
      ...selectLanguages
        .filter(language => !selectedLanguageWithProductName.some(obj => obj[language] !== undefined))
        .map(language => ({ [language]: defaultProductName }))
    ];
  }

  // const selectLanguages = ['FR', 'DE', 'CS'];
  // const selectedLanguageWithProductName = [
  //   { EN: 'abc' },
  //   { DE: 'gef' },
  // ];
  // const defaultProductName = 'abc';

  // const result = addLanguageToProductName(selectLanguages, selectedLanguageWithProductName, defaultProductName);
  // console.log(result);

  // function stringifyLanguageSpecficProductName(payload: LanguageSpecficProductNamePayload): string {
  //   const { defaultLanguage, languageSpecficProductName } = payload;

  //   // Map each language-product name pair to a string in the format "language: productName"
  //   const pairs = languageSpecficProductName.map(obj => {
  //     const [language, productName] = Object.entries(obj)[0];
  //     return `${language}: ${productName}`;
  //   });

  //   // Join the pairs with commas and prepend the default language followed by a pipe character
  //   return `${defaultLanguage} | ${pairs.join(', ')}`;
  // }

  import { Component } from '@angular/core';
  import { ICellRendererAngularComp } from 'ag-grid-angular';

  @Component({
    selector: 'app-custom-renderer',
    template: `<span [style.color]="getTextColor()" [innerHTML]="getText()"></span>`
  })
  export class CustomRendererComponent implements ICellRendererAngularComp {
    value: any;

    agInit(params: any): void {
      this.value = params.value;
    }

    getTextColor(): string {
      if (typeof this.value === 'object' && this.value.color) {
        return this.value.color;
      }
      return 'black'; // Default color
    }

    getText(): string {
      if (typeof this.value === 'object' && this.value.text) {
        return this.value.text;
      }
      return this.value;
    }

    refresh(): boolean {
      return false;
    }
  }


  function removeLogLevelFromString(str) {
    // Define the regular expression pattern
    const pattern = /\[(Fatal|Warn)\]:\s*/;

    // Use the replace method with the regular expression to remove the pattern
    const newStr = str.replace(pattern, '');

    return newStr;
}

const getTimezonePart = (dt: DateTime): string => {
  const timeZonesToDisplay = availableTimeZones;
  const offset = dt.toFormat('ZZ');
  const timezone = timeZonesToDisplay.filter((tz) => tz.rawOffsetInMinutes === dt.offset);
  return timezone.length ? timezone[0].abbreviation : `UTC ${offset}`;
};

const getTimePartWithStyle = (timePart: string, styleClass: string): string => {
  return `<span class="${styleClass}">${timePart}</span>`;
};

const getTimePartWithoutStyle = (timePart: string): string => {
  return timePart;
};

const convertDateTime = (date: string, styleClass?: string): string => {
  const formattedISO = date.replace(' ', 'T');
  const dt = DateTime.fromISO(formattedISO, { setZone: true });

  const datePart = dt.toFormat('yyyy-MM-dd');
  const timePart = dt.toFormat('HH:mm:ss');

  const timezonePart = getTimezonePart(dt);
  const timePartWithStyle = styleClass ? getTimePartWithStyle(timePart, styleClass) : getTimePartWithoutStyle(timePart);

  return `${datePart} ${timePartWithStyle} ${timezonePart}`;
};


interface DateTimeInfo {
  datePart: string;
  timePart: string;
  timeZonePart: string;
}

const convertDateTime = (date: string): DateTimeInfo => {
  const timeZonesToDisplay = availableTimeZones;

  const formattedISO = date.replace(' ', 'T');
  const dt = DateTime.fromISO(formattedISO, { setZone: true });

  const datePart = dt.toFormat('yyyy-MM-dd');
  const timePart = dt.toFormat('HH:mm:ss');
  const offset = dt.toFormat('ZZ');

  const timezone = timeZonesToDisplay.filter((tz) => tz.rawOffsetInMinutes === dt.offset);
  const timeZonePart = timezone.length ? timezone[0].abbreviation : `UTC ${offset}`;

  return {
    datePart: datePart,
    timePart: timePart,
    timeZonePart: timeZonePart
  };
};


getFetchStatus(): Observable<boolean> {
  return this.blotterService.loadingStatus$.pipe(
    map((loadingStatus: LoadingStatus | null) => {
      return loadingStatus ? boltterUtils.isFetchInProgress(loadingStatus.completeStatus) : false;
    }),
    map((status: boolean) => of(status))
  );
}

combineFetchStatusAndMetaData(): Observable<boolean> {
  return combineLatest([
    this.getIsLoadingMetaData(),
    this.getFetchStatus()
  ]).pipe(
    map(([metaDataLoading, fetchStatus]) => {
      return metaDataLoading || fetchStatus;
    })
  );
}
