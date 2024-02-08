import { Component, OnInit } from '@angular/core';
import { combineLatest, distinctUntilChanged, withLatestFrom } from 'rxjs';
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

  gridOptions: GridOptions = {
    columnDefs: this.getColumnDefs(),
    rowData: this.getTransformedRows()
  };

  getColumnDefs() {
    return this.header.map(colName => ({ headerName: colName, field: colName }));
  }

  getTransformedRows() {
    return transformRows(this.header, this.rows);
  }

  export function transformRows(header: string[], rows: string[][]): { [key: string]: string }[] {
    return rows.map(row => {
      let transformedRow: { [key: string]: string } = {};
      header.forEach((key, index) => {
        transformedRow[key] = row[index];
      });
      return transformedRow;
    });
  }
}
