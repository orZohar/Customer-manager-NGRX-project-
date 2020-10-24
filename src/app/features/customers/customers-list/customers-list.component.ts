import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/shared/interfaces';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  @Input() customers: Customer[];
 // loading$: Observable<boolean>;
  //customers$: Observable<Customer[]>;
  customers$ : Observable<Customer[]> = this.store$.pipe(
    select('entityCache', 'Customer', 'entities'),
    map((customers: Dictionary<Customer>) => {
      const customersArray: Customer[] = [];
      for (let customer of Object.values(customers)) {
        customersArray.push(customer);
      }
      return customersArray;
    })
  )

  constructor(private customersService: CustomersService, private router: Router, private store$: Store<any>) {
   // this.loading$ = this.customersService.loading$;
  }

  ngOnInit(){
    
  }

  deleteCustomer(customer) {
    this.customersService.delete(customer).subscribe(result => {
    })
  }

  editCustomer(customer: Customer) {
    // this.customersService.update(customer).subscribe(result => {
    //   console.log(result)
    // })

    // go to edit
    this.router.navigate(['customers/edit', customer.id]);
  }
}