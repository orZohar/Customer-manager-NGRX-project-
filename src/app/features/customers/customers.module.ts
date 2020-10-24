import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { StoreModule } from '@ngrx/store';
import { ENTITY_METADATA_TOKEN, PLURAL_NAMES_TOKEN } from '@ngrx/data';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersComponent } from './customers-view/customers.component';
import { EffectsModule } from '@ngrx/effects';
import { CustomersEffects } from './customers.effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { reducer } from './reducers/customers.reducer';

@NgModule({
  declarations: [CustomersListComponent, CustomersComponent, NewCustomerComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    EffectsModule.forFeature([CustomersEffects]), // must here for effects to generate
   // StoreModule.forFeature('Customer',{}   )
  ],
  providers: [  
    // {
    //    // we tell entity chache to make Customers key and be ready to get data of the customers from the server and sync with that data
    //    // ngrx/data is creating a service inthe background that sync our data from the server and to send requests to the server and sync them.
    //    // now we need to tell ngrx/data what's our address and config it to change the default one.
    //   provide: ENTITY_METADATA_TOKEN, multi: true, useValue: {
    //     Customers: {} // creates a users service with the all the functions 
    //   }
    // },
    // {
    //  // ngrx/data presumes by default that "Customers" is singural and we want it as plural so we config the defualt. we want our server to have one word "customers"
    //  // it's the convention, so we tell him always use "customers" in all requests types
    //   provide: PLURAL_NAMES_TOKEN, multi: true, useValue: {
    //     'Customers': 'Customers' // singural and plural
    //   }
    // }
  ]
})
export class CustomersModule { }
