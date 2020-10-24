import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { Customer } from 'src/app/shared/interfaces';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersComponent } from './customers-view/customers.component';
import { CustomersService } from './customers.service';
import { NewCustomerComponent } from './new-customer/new-customer.component';

// @Injectable()
// export class CustomerResolver implements Resolve<Observable<Customer>> {
//   constructor(private customersService: CustomersService) { }
//   resolve(route: ActivatedRouteSnapshot) {
//     console.log(route.data)
//     if (route.data.edit) {
//       return this.customersService.select(route.params.id);
//     }
//   }
// }

const routes: Routes = [
  {
    path: '', component: CustomersComponent,
    children: [
      {
        path: '',
        component: CustomersListComponent,
      },
      {
        path: 'new',
        component: NewCustomerComponent,
      },
      {//
        path: 'edit/:id',
        component: NewCustomerComponent,
        data: {
          edit: true,
        },
      }
    ]
  },
];


@NgModule({
 // providers: [CustomerResolver],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
