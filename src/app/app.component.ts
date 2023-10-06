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
