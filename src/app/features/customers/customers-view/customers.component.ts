import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../../../shared/interfaces';
import { CustomersService } from '../customers.service';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  title = 'Customers';
  loading$: Observable<boolean>;

  constructor(private customersService: CustomersService, private router: Router, private store$: Store<any>) {
    this.loading$ = this.customersService.loading$;
  }

  ngOnInit() {}

  onChangeTab(event) {
    console.log(event)
    switch (event.index) {
      case 0:
        this.router.navigate(['customers']);
        break;
      case 1:
        this.router.navigate(['customers/new']);
        break;
      default:
    }
  }
}
