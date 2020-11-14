// import { Injectable } from '@angular/core';
// import { Subject, Observable } from 'rxjs';
// import { ConfirmationService } from 'primeng/api';

// @Injectable({
//     providedIn: 'root',
// })

// export class AlertsService {
//     msgs: any[] = [];

//     constructor(
//         private confirmationService: ConfirmationService
//     ) { }

//     confirm1() {
//         console.log('asd')
//         var subject = new Subject<boolean>();
//         this.confirmationService.confirm({
//             message: 'Are you sure that you want to proceed?',
//             header: 'Confirmation',
//             icon: 'pi pi-exclamation-triangle',
//             accept: () => {
//                 this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
//                 subject.next(true);
//                 subject.complete();
//             },
//             reject: () => {
//                 this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
//             }
//         });

//         return subject.asObservable();
//     }
// }
//   //public dataInputModal(): Observable<any> {
// //     var subject = new Subject<string>();
// //     const dialogRef = this.dialog.open(DataInputDialogComponent, {
// //       disableClose: true,
// //       width: '400px', height: '400px', data: { subject: subject }
// //     });

// //     return subject.asObservable();
// //   }
// //}  