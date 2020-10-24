import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersService } from './features/customers/customers.service';
import { OrdersService } from './features/orders/orders.service';
import { Customer, Order } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mean-app';
  customers$: Observable<Customer[]>;
  orders$: Observable<Order[]>;

  constructor(private customersService: CustomersService, private ordersService: OrdersService){}
  ngOnInit() {
    //this.getCustomers();
  }

  getCustomers() {
    //this.orders$ = this.ordersService.getAll();
    //this.customers$ = this.customersService.getAll();
  }
}