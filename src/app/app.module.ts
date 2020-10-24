import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from './shared/shared.module'
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
//import { CustomersModule } from './features/customers/customers.module';
import { AppStoreModule } from './store/app-store.module';
import {CoreModule} from './core/core.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomersEffects } from './features/customers/customers.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    AppStoreModule,
    CoreModule,
    StoreModule.forRoot(reducers, {  // reducers = collection of reducers
      metaReducers, // middlewares for reducers (like log to action)
      runtimeChecks: { // checks it does to see if we are breaking redux rules
        strictActionImmutability: true,
        strictActionSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    BrowserAnimationsModule,
   // CustomersModule
  ],
  // ngrx/data change the default server url
  // providers: [
  //   { provide: DefaultDataServiceConfig, useValue : {
  //     root: 'http://localhost:3000'
  //   }}
  //  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
