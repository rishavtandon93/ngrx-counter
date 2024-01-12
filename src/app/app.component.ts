import { Component } from '@angular/core';
export interface myInterface {
  [key: string]: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NgRx_Counter';

  constructor() {
    this.example();
  }

  example() {
    let result: myInterface[] = [{ EN: 'abc' }, { DE: 'gef' }, { ESP: 'abc' }];

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
}

import { zip } from 'rxjs';
import {
  catchError,
  first,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';

// private onDealableMultiple() {
//   return this.events.onDealableMultiplePricers().pipe(
//     mergeMap((payload: { pricerIds: string[] }) => {
//       const pricers$ = this.pricerRepo.getPricerbyId(payload.pricerIds);

//       return pricers$.pipe(
//         first(),
//         switchMap((pricers: Pricer[]) => {
//           const isMifidObservables = pricers.map((pricer) =>
//             this.IsMifidRequired(pricer.pricerId).pipe(
//               catchError(() => of(undefined)) // Handle errors by setting to undefined
//             )
//           );

//           return zip(...isMifidObservables, (...results) => {
//             const resultObjects = payload.pricerIds.map((pricerId, index) => ({
//               id: pricerId,
//               isMIfidRequired: results[index],
//             }));
//             return resultObjects;
//           }).pipe(
//             tap((results) => {
//               // Log the results
//               console.log('IsMifidRequired results:', results);
//             }),
//             mergeMap((results) => {
//               // Now, you can use pricers and results as needed
//               return this.dealableSpecificPricers(pricers, results);
//             })
//           );
//         })
//       );
//     })
//   );
// }

// private onDealableMultiple() {
//   return this.events.onDealableMultiplePricers().pipe(
//     mergeMap((payload: { pricerIds: string[] }) => {
//       const pricers$ = this.pricerRepo.getPricerbyId(payload.pricerIds);

//       return pricers$.pipe(
//         first(),
//         switchMap((pricers: Pricer[]) => {
//           const isMifidObservables = pricers.map((pricer) =>
//             this.IsMifidRequired(pricer.pricerId).pipe(
//               catchError(() => of(undefined)) // Handle errors by setting to undefined
//             )
//           );

//           return forkJoin(isMifidObservables).pipe(
//             tap((results) => {
//               // Log the results
//               console.log('IsMifidRequired results:', results);
//             }),
//             mergeMap((results) => {
//               const resultObjects = pricers.map((pricer, index) => ({
//                 id: pricer.pricerId,
//                 isMIfidRequired: results[index],
//               }));

//               // Now, you can use pricers and resultObjects as needed
//               return this.dealableSpecificPricers(pricers, resultObjects);
//             })
//           );
//         })
//       );
//     })
//   );
// }

// import { catchError, first, mergeMap, switchMap, tap } from 'rxjs/operators';
// import { combineLatest, forkJoin, of } from 'rxjs';

// private onDealableMultiple() {
//   return this.events.onDealableMultiplePricers().pipe(
//     mergeMap((payload: { pricerIds: string[] }) => {
//       const pricers$ = this.pricerRepo.getPricerbyId(payload.pricerIds);

//       return pricers$.pipe(
//         first(),
//         switchMap((pricers: Pricer[]) => {
//           const isMifidObservables = pricers.map((pricer) =>
//             this.IsMifidRequired(pricer.pricerId).pipe(
//               catchError(() => of(undefined)) // Handle errors by setting to undefined
//             )
//           );

//           return combineLatest(isMifidObservables).pipe(
//             tap((results) => {
//               // Log the results
//               console.log('IsMifidRequired results:', results);
//             }),
//             mergeMap((results) => {
//               const resultObjects = pricers.map((pricer, index) => ({
//                 id: pricer.pricerId,
//                 isMIfidRequired: results[index],
//               }));

//               // Now, you can use pricers and resultObjects as needed
//               return this.dealableSpecificPricers(pricers, resultObjects);
//             })
//           );
//         })
//       );
//     })
//   );
// }

// private onDealableMultiple() {
//   return this.events.onDealableMultiplePricers().pipe(
//     mergeMap((payload: { pricerIds: string[], clientRequestTime: string }) => {
//       return this.pricerRepo.getPricerbyId(payload.pricerIds).pipe(
//         first(),
//         switchMap((pricers: Pricer[]) => {
//           const isMifidObservables = pricers.map((pricer) =>
//             this.IsMifidRequired(pricer.pricerId).pipe(
//               catchError(() => of(undefined)) // Handle errors by setting to undefined
//             )
//           );

//           return combineLatest(isMifidObservables).pipe(
//             mergeMap((results) => {
//               const resultObjects = pricers.map((pricer, index) => {
//                 const isMIfidRequired = results[index];
//                 const resultObject = { id: pricer.pricerId, isMIfidRequired };

//                 if (isMIfidRequired) {
//                   resultObject.clientReqeustTime = payload.clientRequestTime;
//                 }

//                 return resultObject;
//               });

//               return this.dealableSpecificPricers(resultObjects);
//             })
//           );
//         })
//       );
//     })
//   );
// }

// private onDealableMultiple() {
//   return this.events.onDealableMultiplePricers().pipe(
//     mergeMap((payload: { pricerIds: string[], clientRequestTime: string }) => {
//       const pricers$ = this.pricerRepo.getPricerbyId(payload.pricerIds);

//       return pricers$.pipe(
//         first(),
//         switchMap((pricers: Pricer[]) => {
//           const isMifidObservables = pricers.map((pricer) =>
//             this.IsMifidRequired(pricer.pricerId).pipe(
//               catchError(() => of(undefined)) // Handle errors by setting to undefined
//             )
//           );

//           return zip(...isMifidObservables, (...results) => {
//             const resultObjects = payload.pricerIds.map((pricerId, index) => {
//               const isMIfidRequired = results[index];
//               const resultObject = { id: pricerId, isMIfidRequired };

//               if (isMIfidRequired) {
//                 resultObject.clientReqeustTime = payload.clientRequestTime;
//               }

//               return resultObject;
//             });

//             return resultObjects;
//           }).pipe(
//             tap((results) => {
//               // Log the results
//               console.log('IsMifidRequired results:', results);
//             }),
//             mergeMap((results) => {
//               // Now, you can use pricers and results as needed
//               return this.dealableSpecificPricers(pricers, results);
//             })
//           );
//         })
//       );
//     })
//   );
// }

// private dealableSpecificPricers(pricers: Pricer[], resultObjects: ResultObject[]) {
//   return merge(
//     pricers.map((pricer, index) => {
//       const resultObject = resultObjects[index];
//       const isMet = resultObject.id && resultObject.isMIfidRequired === true && resultObject.clientReqeustTime !== null && resultObject.clientReqeustTime !== undefined;

//       return of(isMet);
//     })
//   ).pipe(
//     mergeAll(),
//     mergeMap((isValid) => {
//       console.log('isValid', isValid);

//       if (isValid) {
//         return PricerActions.calculatePriceRequested({
//           workspaceID: pricers.id,
//           formID: PricerConfigEnum.FormId
//         });
//       } else {
//         return of(); // You can adjust this part based on your use case
//       }
//     })
//   );
// }

// private onDealableMultiple() {
//   return this.events.onDealableMultiplePricers().pipe(
//     mergeMap((payload: { pricerIds: string[], clientRequestTime: string }) => {
//       const pricers$ = this.pricerRepo.getPricerbyId(payload.pricerIds);

//       return pricers$.pipe(
//         first(),
//         switchMap((pricers: Pricer[]) => {
//           const isMifidObservables = pricers.map((pricer) =>
//             this.IsMifidRequired(pricer.pricerId).pipe(
//               catchError(() => of(undefined)) // Handle errors by setting to undefined
//             )
//           );

//           return zip(...isMifidObservables, (...results) => {
//             const resultObjects = payload.pricerIds.map((pricerId, index) => {
//               const isMIfidRequired = results[index];
//               const resultObject = { id: pricerId, isMIfidRequired };

//               if (isMIfidRequired) {
//                 resultObject.clientReqeustTime = payload.clientRequestTime;
//               }

//               return resultObject;
//             });

//             // Add more logic here
//             const newLogicOutput = resultObjects.map((resultObject) => {
//               if (
//                 resultObject.id &&
//                 resultObject.isMIfidRequired === true &&
//                 resultObject.clientReqeustTime !== null &&
//                 resultObject.clientReqeustTime !== undefined
//               ) {
//                 return true;
//               } else if (resultObject.id && resultObject.isMIfidRequired === true) {
//                 return false;
//               } else {
//                 return false;
//               }
//             });

//             // Check if all elements meet the condition
//             const allMeetCondition = newLogicOutput.every((value) => value === true);

//             return allMeetCondition;
//           }).pipe(
//             tap((newLogicOutput: boolean) => {
//               console.log(newLogicOutput);
//             }),
//             mergeMap((results) => {
//               return this.dealableSpecificPricers(pricers, results);
//             })
//           );
//         })
//       );
//     })
//   );
// }

// private onDealableMultiple() {
//   return this.events.onDealableMultiplePricers().pipe(
//     mergeMap((payload: { pricerIds: string[], clientRequestTime: string }) => {
//       const pricers$ = this.pricerRepo.getPricerbyId(payload.pricerIds);

//       return pricers$.pipe(
//         first(),
//         switchMap((pricers: Pricer[]) => {
//           const isMifidObservables = pricers.map((pricer) =>
//             this.IsMifidRequired(pricer.pricerId).pipe(
//               catchError(() => of(undefined)) // Handle errors by setting to undefined
//             )
//           );

//           return zip(...isMifidObservables, (...results) => {
//             const resultObjects = payload.pricerIds.map((pricerId, index) => {
//               const isMIfidRequired = results[index];
//               const resultObject = { id: pricerId, isMIfidRequired };

//               if (isMIfidRequired) {
//                 resultObject.clientReqeustTime = payload.clientRequestTime;
//               }

//               return resultObject;
//             });

//             // Add more logic here
//             const newLogicOutput = resultObjects.map((resultObject) => {
//               if (
//                 resultObject.id &&
//                 resultObject.isMIfidRequired === true &&
//                 resultObject.clientReqeustTime !== null &&
//                 resultObject.clientReqeustTime !== undefined
//               ) {
//                 return true;
//               } else if (resultObject.id && resultObject.isMIfidRequired === true) {
//                 return false;
//               } else {
//                 return false;
//               }
//             });

//             // Check if all elements meet the condition
//             const allMeetCondition = newLogicOutput.every((value) => value === true);

//             return { newLogicOutput, resultObjects }; // Combine both outputs into an object
//           }).pipe(
//             tap(({ newLogicOutput, resultObjects }) => {
//               // Tap both newLogicOutput and resultObjects
//               console.log('New Logic Output:', newLogicOutput);
//               console.log('Result Objects:', resultObjects);
//             }),
//             mergeMap(({ newLogicOutput, resultObjects }) => {
//               return this.dealableSpecificPricers(newLogicOutput, resultObjects);
//             })
//           );
//         })
//       );
//     })
//   );
// }

// private onDealableM(action: Observable<Action | unkown>) {
//   return action.pipe(
//     mergeMap((payload: ConfirmClientRequestTimeMultiplePricersPayload) => {
//       const pricers$ = this.pricerRepoService.getPricersById(payload.pricerIds);
//       return pricers$.pipe(
//         first(),
//         switchMap((pricers: Pricer[]) => {
//           const isMifidRequiredForPricers$ = pricers.map((pricers) => this.formOptionsRepo.isMifidRequired(pricer.id, PricerEnum.FormId));

//           return zip(...isMifidRequiredForPricers$, (...results) => {

//             const mappedPricersWithClientTIme = payloads.pricerIds.map((pricerId, index) => {
//               const isMifidRequired = results[index];
//               const mappedPricerIds = {
//                 id: pricerId,
//                 isMifidRequired,
//                 clientRequestTime: payload.clientRequestTime
//               }

//               return mappedPricerIds;
//             })

//             const isMifidRequiredForAnyPricer = checkIfMifidRequiredForAnyPricer(mappedPricersWithClientTIme);

//             return { isMifidRequiredForAnyPricer, mappedPricersWithClientTIme };
//           }).pipe(
//             tap((isMifidRequiredForAnyPricer) =>{
//                this.mifidModalService.setIsMifidModal(isMifidRequiredForAnyPricer);
//             }),
//             mergeMap(({mappedPricersWithClientTIme}) => {
//               return this.dealableSpecificPricers(mappedPricersWithClientTIme);
//             })
//           )
//         })
//       );
//     })
//   );
// }

// private onDealableM(action: Observable<Action | unknown>) {
//   return action.pipe(
//     mergeMap((payload: ConfirmClientRequestTimeMultiplePricersPayload) => {
//       const pricers$ = this.pricerRepoService.getPricersById(payload.pricerIds);

//       return pricers$.pipe(
//         first(),
//         switchMap((pricers: Pricer[]) => {
//           const isMifidRequiredObservables = pricers.map((pricer) =>
//             this.formOptionsRepo.isMifidRequired(pricer.id, PricerEnum.FormId)
//           );

//           return combineLatest(isMifidRequiredObservables).pipe(
//             map((results: boolean[]) => {
//               const mappedPricersWithClientTime = payload.pricerIds.map((pricerId, index) => ({
//                 id: pricerId,
//                 isMifidRequired: results[index],
//                 clientRequestTime: payload.clientRequestTime,
//               }));

//               const isMifidRequiredForAnyPricer = checkIfMifidRequiredForAnyPricer(mappedPricersWithClientTime);

//               return { isMifidRequiredForAnyPricer, mappedPricersWithClientTime };
//             }),
//             tap(({ isMifidRequiredForAnyPricer }) => {
//               this.mifidModalService.setIsMifidModal(isMifidRequiredForAnyPricer);
//             }),
//             mergeMap(({ mappedPricersWithClientTime }) => {
//               return this.dealableSpecificPricers(mappedPricersWithClientTime);
//             })
//           );
//         })
//       );
//     })
//   );
// }
