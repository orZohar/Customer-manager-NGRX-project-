import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/shared/interfaces';
import { CustomersService } from '../customers.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})

export class CustomersListComponent implements OnInit {
  @Input() customers: Customer[];
  // loading$: Observable<boolean>;
  //customers$: Observable<Customer[]>;
  customers$: Observable<Customer[]> = this.store$.pipe(
    select('entityCache', 'Customer', 'entities'),
    map((customers: Dictionary<Customer>) => {
      const customersArray: Customer[] = [];
      for (let customer of Object.values(customers)) {
        customersArray.push(customer);
      }
      return customersArray;
    })
  )

  constructor(private customersService: CustomersService, private router: Router, private store$: Store<any>, private confirmationService: ConfirmationService) {
    // this.loading$ = this.customersService.loading$;
  }

  ngOnInit() {
  }

  msgs = [];
  deleteCustomer(customer) {
    // var subject = new Subject<boolean>();
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.customersService.delete(customer).subscribe(result => {
        })
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });

    // return subject.asObservable();
    //  this.alertsService.confirm1().subscribe(result => {
    //  console.log(result)
    // //   // this.customersService.delete(customer).subscribe(result => {
    // //   // })
    // })
  }

  editCustomer(customer: Customer) {
    // go to edit
    this.router.navigate(['customers/edit', customer.id]);
  }


  selectedId;
  paintPickedRow(id){
      this.selectedId = id;
  }
}