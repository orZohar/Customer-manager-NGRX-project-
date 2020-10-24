import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {OrderListModule} from 'primeng/orderlist';


@NgModule({
  declarations: [CapitalizePipe],
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    TabMenuModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    OrderListModule
    
  ],
  exports: [
    CommonModule,
    TableModule,
    TabViewModule,
    FormsModule,
    RippleModule,
    TabMenuModule,
    ReactiveFormsModule,
    ButtonModule,
    AutoCompleteModule,
    CapitalizePipe,
    OrderListModule
  ]
})
export class SharedModule { }
