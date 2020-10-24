import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersViewComponent,
    children: [
      {
        path: '',
        component: OrdersListComponent,
      },
      {
        path: 'new',
        component: NewOrderComponent,
      },
      {//
        path: 'edit/:id',
        component: NewOrderComponent,
        // resolve: {
        //   customerData: CustomerResolver
        // }, 
        data: {
          edit: true,
        },
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
