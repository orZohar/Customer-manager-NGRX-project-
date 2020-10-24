import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, Order } from 'src/app/shared/interfaces';
import { CustomersService } from '../../customers/customers.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit {

  
  title = 'Orders';
  orders$: Observable<Order[]>;
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;

  constructor(private customersService: CustomersService) {
      this.loading$ = this.customersService.loading$;
  }

  ngOnInit() {
 //   this.getCustomers();
  }

 

}
