import { Component } from '@angular/core';

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
    //const val1: any = this.getValue(undefined) === undefined ? 0 : this.getValue(4);
    const val1: any = this.getValue(undefined) || 0;
    console.log(val1);
  }

  getValue(value: any) {
    return value;
  }

}

import { zip } from 'rxjs';
import { catchError, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';

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




