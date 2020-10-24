
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { DefaultDataServiceConfig, EntityDataModule, ENTITY_METADATA_TOKEN, PLURAL_NAMES_TOKEN } from '@ngrx/data';
import { entityConfig } from '../entity-metadata';
import { CustomersEffects } from '../features/customers/customers.effects';
import { OrdersEffects } from '../features/orders/orders.effects';

const apiRoot = 'http://localhost:3000' + '/';
// const defaultDataServiceConfig: DefaultDataServiceConfig = {
//     root: apiRoot,
//     entityHttpResourceUrls: {
//         Customer: { entityResourceUrl: apiRoot + 'customers/', collectionResourceUrl: apiRoot + 'customers/' },
//         Order: { entityResourceUrl: apiRoot + 'orders/', collectionResourceUrl: apiRoot + 'orders/' },
//     }
// };

@NgModule({
    imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig),
        environment.production ? [] : StoreDevtoolsModule.instrument()
    ],
    providers: [
    {
            provide: DefaultDataServiceConfig, useValue: {
                root: apiRoot,
                entityHttpResourceUrls: {
                    Customer: { entityResourceUrl: apiRoot + 'customers/', collectionResourceUrl: apiRoot + 'customers/' },
                    Order: { entityResourceUrl: apiRoot + 'orders/', collectionResourceUrl: apiRoot + 'orders/' },
                }
            }
        },
        {
            // we tell entity chache to make Customers key and be ready to get data of the customers from the server and sync with that data
            // ngrx/data is creating a service inthe background that sync our data from the server and to send requests to the server and sync them.
            // now we need to tell ngrx/data what's our address and config it to change the default one.
            provide: ENTITY_METADATA_TOKEN, multi: true, useValue: {
                Customers: {}, // creates a users service with the all the functions 
                Orders: {} // creates a users service with the all the functions 
            }
        },
        {
            // ngrx/data presumes by default that "Customers" is singural and we want it as plural so we config the defualt. we want our server to have one word "customers"
            // it's the convention, so we tell him always use "customers" in all requests types
             provide: PLURAL_NAMES_TOKEN, multi: true, useValue: {
               'Customers': 'Customers', // singural and plural
               'Orders': 'Orders'
             }
           },
    ]
})
export class AppStoreModule { }


