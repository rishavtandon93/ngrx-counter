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

import { combineLatest } from 'rxjs';
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

//           return combineLatest(isMifidObservables).pipe(
//             tap((results) => {
//               // Log the results
//               console.log('IsMifidRequired results:', results);
//             }),
//             map((results) => ({
//               pricers,
//               mifidResults: results,
//             }))
//           );
//         }),
//         mergeMap(({ pricers, mifidResults }) => {
//           // Now, you can use pricers and mifidResults as needed
//           return this.dealableSpecificPricers(pricers, mifidResults);
//         })
//       );
//     })
//   );
// }

// import { forkJoin, of } from 'rxjs';
// import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

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
//             map((results) => ({
//               pricers,
//               mifidResults: results,
//             }))
//           );
//         }),
//         mergeMap(({ pricers, mifidResults }) => {
//           // Now, you can use pricers and mifidResults as needed
//           return this.dealableSpecificPricers(pricers, mifidResults);
//         })
//       );
//     })
//   );
// }

// import { zip } from 'rxjs';
// import { catchError, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';

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
//             const resultObject = {};
//             payload.pricerIds.forEach((pricerId, index) => {
//               resultObject[pricerId] = results[index];
//             });
//             return resultObject;
//           }).pipe(
//             tap((results) => {
//               // Log the results
//               console.log('IsMifidRequired results:', results);
//             }),
//             map((results) => ({
//               pricers,
//               mifidResults: results,
//             }))
//           );
//         }),
//         mergeMap(({ pricers, mifidResults }) => {
//           // Now, you can use pricers and mifidResults as needed
//           return this.dealableSpecificPricers(pricers, mifidResults);
//         })
//       );
//     })
//   );
// }





