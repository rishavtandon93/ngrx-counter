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
}
