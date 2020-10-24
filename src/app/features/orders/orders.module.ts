import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomersModule } from '../customers/customers.module';
import { CustomersEffects } from '../customers/customers.effects';
import { OrdersEffects } from './orders.effects';


@NgModule({
  declarations: [OrdersViewComponent, OrdersListComponent, NewOrderComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    CustomersModule,
    EffectsModule.forFeature([OrdersEffects]), // must here for effects to generate

  ]
})
export class OrdersModule { }
