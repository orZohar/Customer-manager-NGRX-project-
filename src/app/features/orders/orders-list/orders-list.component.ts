import { Component, OnInit } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, Customer } from 'src/app/shared/interfaces';
import { CustomersService } from '../../customers/customers.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  orders$ : Observable<Order[]> = this.store$.pipe(
    select('entityCache', 'Order', 'entities'),
    map((customers: Dictionary<Order>) => {
      const customersArray: Order[] = [];
      for (let customer of Object.values(customers)) {
        customersArray.push(customer);
      }
      return customersArray;
    }))

    // ).subscribe(result=> { 

    // })
  


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

  constructor(private customersService: CustomersService, private store$ : Store<any>) {
  }
 
  ngOnInit() {
    this.store$.pipe(
      select('entityCache', 'Order', 'entities'),
      map((customers: Dictionary<Order>) => {
        const customersArray: Order[] = [];
        for (let customer of Object.values(customers)) {
          customersArray.push(customer);
        }
        return customersArray;
      })).subscribe(result => { 

      })
    
  }

  getCustomers() {
  }

}
