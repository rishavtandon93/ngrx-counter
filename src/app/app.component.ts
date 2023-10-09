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


private ondealableMutiple() {
  return this.evenets.onDealableMultiplePricers().pipe(
    mergeMap((payload: {pricerIds: string[]}) => {
      const pricers$ = this.pricerRepo.getPricerbyId(payload.pricerIds);
      return pricers$.pipe(
        first(), 
        map((pricers: Pricer[]) => {
          return pricers.filter((pricer: Pricer) => !pricer.isLoading);
        }),
        mergeMap((pricers: Pricer[]) => {
          return this.dealableSpecificPricers(pricers);
        })
      )
    })
  )
}

  // showModal(action: Observable<Action | unknown>) {
  //   return action.pipe(
  //     mergeMap(({ workspaceId, formId, clienRequestTime }) =>
  //       this.formStoreRepository.getModel(workspaceId, PricerEnum.FormId).pipe(
  //         first(),
  //         switchMap(() => {
  //           // Get the value of isMifidRequired before continuing
  //           return this.pricerRepo.isMifidRequired(workspaceId, PricerEnum.FormId).pipe(
  //             take(1), // Ensure that we only get one value
  //             withLatestFrom(
  //               this.pricerRepo.getPriceId(workspaceId),
  //               this.pricerRepo.getPriceRegion(workspaceId)
  //             ),
  //             map(
  //               ([isMifidRequired, pricer, region]: [boolean, Pricer, string]) => {
  //                 if (isMifidRequired && !clienRequestTime) {
  //                   return PricerActions.showMifidModal({ pricerId: pricer.id });
  //                 } else {
  //                   return PricerActions.CalculatePriceRequested({
  //                     workspaceId,
  //                     formId,
  //                     dealable: true,
  //                     clienRequestTime,
  //                   });
  //                 }
  //               }
  //             )
  //           );
  //         })
  //       )
  //     )
  //   );
  // }

//   showModal(action: Observable<Action | unkown>) {
//     return action.pipe(
//       mergeMap(({ workspaceId, formId, clienRequestTime }) =>
//         this.formStoreRepository.getModel(workspaceId, PricerEnum.FormId).pipe(
//           first(),
//           // get value of this.pricerRepo.isMifidRequired(workspaceId, PricerEnum.FormId)
//           // and set value in mifid modal service
//           withlastestFrom(
//             this.pricerRepo.getPriceId(workspaceId),
//             this.pricerRepo.getPriceRegion(workspaceId),
//             this.pricerRepo.isMifidRequired(workspaceId, PricerEnum.FormId)
//           ),
//           map(
//             ([model, pricer, region, isMifidRequired]: [
//               string,
//               Pricer,
//               string,
//               boolean
//             ]) =>
//               isMifidRequired && !clienRequestTime
//                 ? PricerActions.showMifidModal({ pricerId: pricer.id })
//                 : PricerActions.CalculatePrriceRequested({
//                     workspaceId,
//                     formId,
//                     dealable: true,
//                     clienRequestTime,
//                   })
//           )
//         )
//       )
//     );
//   }
// }


// showModal(action: Observable<Action | unknown>) {
//   return action.pipe(
//     mergeMap(({ workspaceId, formId, clienRequestTime }) =>
//       this.formStoreRepository.getModel(workspaceId, PricerEnum.FormId).pipe(
//         first(),
//         switchMap(() =>
//           this.pricerRepo.isMifidRequired(workspaceId, PricerEnum.FormId).pipe(
//             take(1),
//             withLatestFrom(
//               this.pricerRepo.getPriceId(workspaceId),
//               this.pricerRepo.getPriceRegion(workspaceId)
//             ),
//             tap((isMifidRequired) => {
//               // Set the value in the Mifid Modal Service
//               this.mifidModalService.setIsMifidRequired(isMifidRequired);
//             }),
//             map(([isMifidRequired, pricer, region]: [boolean, Pricer, string]) =>
//               isMifidRequired && !clienRequestTime
//                 ? PricerActions.showMifidModal({ pricerId: pricer.id })
//                 : PricerActions.CalculatePriceRequested({
//                     workspaceId,
//                     formId,
//                     dealable: true,
//                     clienRequestTime,
//                   })
//             )
//           )
//         )
//       )
//     )
//   );
// }

// private ondealableMutiple() {
//   return this.evenets.onDealableMultiplePricers().pipe(
//     mergeMap((payload: {pricerIds: string[]}) => {
//       const pricers$ = this.pricerRepo.getPricerbyId(payload.pricerIds);

//       // Create an array of observables for IsMifidRequred checks
//       const isMifidRequiredObservables: Observable<boolean>[] = payload.pricerIds.map(pricerId => {
//         return this.IsMifidRequred(pricerId);
//       });

//       // Use forkJoin to wait for all IsMifidRequred observables to complete
//       return forkJoin(isMifidRequiredObservables).pipe(
//         map((results: boolean[]) => {
//           // Check if all results are true
//           const allTrue = results.every(result => result === true);
//           return { allTrue, pricerIds: payload.pricerIds };
//         }),
//         mergeMap(({ allTrue, pricerIds }) => {
//           if (allTrue) {
//             // All pricerIDs have IsMifidRequred as true, send dealableSpecificPricers request
//             const pricers$ = this.pricerRepo.getPricerbyId(pricerIds);
//             return pricers$.pipe(
//               first(),
//               map((pricers: Pricer[]) => {
//                 return pricers.filter((pricer: Pricer) => !pricer.isLoading);
//               }),
//               mergeMap((pricers: Pricer[]) => {
//                 return this.dealableSpecificPricers(pricers);
//               })
//             );
//           } else {
//             // At least one pricerID has IsMifidRequred as false, do not send dealableSpecificPricers
//             return EMPTY; // or return any other Observable as needed
//           }
//         })
//       );
//     })
//   );
// }


// private ondealableMutiple() {
//   return this.evenets.onDealableMultiplePricers().pipe(
//     mergeMap((payload: { pricerIds: string[] }) => {
//       const pricers$ = this.pricerRepo.getPricerbyId(payload.pricerIds);
//       return pricers$.pipe(
//         first(),
//         map((pricers: Pricer[]) => {
//           return pricers.filter((pricer: Pricer) => !pricer.isLoading);
//         }),
//         mergeMap((pricers: Pricer[]) => {
//           const observables: Observable<boolean>[] = [];

//           // Create an array of Observables for IsMifidRequired for each pricer
//           for (const pricer of pricers) {
//             const isMifidRequired$ = this.IsMifidRequired(pricer.pricerId);
//             observables.push(isMifidRequired$);
//           }

//           // Use forkJoin to wait for all IsMifidRequired Observables to complete
//           return forkJoin(observables).pipe(
//             map((results: boolean[]) => {
//               // Check if all results are true
//               const allMifidRequired = results.every((result) => result === true);

//               if (allMifidRequired) {
//                 // If all pricers require Mifid, don't send the request
//                 return null;
//               } else {
//                 // If any pricer does not require Mifid, send the request
//                 return this.dealableSpecificPricers(pricers);
//               }
//             })
//           );
//         })
//       );
//     })
//   );
// }
