import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Customer } from 'src/app/shared/interfaces';
import { CustomersService } from '../customers.service';
import { setNewCustomer } from '../actions/customers.actions';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { map } from 'rxjs/operators';
import { ConstantPool } from '@angular/compiler';
@Component({
  selector: 'new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  states = [];
  customer$: Observable<Customer>;

  customer: Customer =
    {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      ordersTotal: null,
      orders: []
    };
  // states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  customerForm: FormGroup;
  editCustomerId: number; 

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store$: Store<any>,
    private customersService: CustomersService,
    private fb: FormBuilder) {
    // use FormBuilder to create a form group
    this.customerForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'address': ['', Validators.required],
      'city': ['', Validators.required],
      'email': ['', Validators.required]
    });
  }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Don't technically need that here
    // since param won't be changing while component is alive.
    // Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.params.subscribe((params: Params) => {
      this.editCustomerId =+params['id'];

      this.customer$ = this.store$.pipe(
        select('entityCache', 'Customer', 'entities', this.editCustomerId),
        map((customer: Customer) => {
          // this.customerForm.value = customer;
          if (customer) {
            this.customerForm.patchValue(customer);
          }
          return customer;
        })
      )

      if (this.editCustomerId) {
        this.operationText = 'Update';
      }
    });

    // this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }

  getCustomer(id: number) {
    // this.dataService.getCustomer(id).subscribe((customer: Customer) => {
    //    this.customer = customer;
    //  });
  }

  submit() {
    if (this.customerForm.invalid) {
      // this.errMessage = "Please fill up the form correctly"
      return;
    }


    const credentials = this.customerForm.value;
    
    if (this.operationText === "Update") {
      credentials.id = this.editCustomerId;
      this.customersService.update(credentials).subscribe((result: any) => {
      // this.store$.dispatch(setNewCustomer({ id: credentials.id  }))
       this.router.navigate(['/customers']);

      });

    } else {
      this.customersService.add(credentials).subscribe((result: Customer) => {
      // this.store$.dispatch(setNewCustomer({ id: result.id }))
        this.router.navigate(['/customers']);
      });
    }
  }
  //cancel(event: Event) {
  //   event.preventDefault();
  // Route guard will take care of showing modal dialog service if data is dirty
  //   this.router.navigate(['/customers']);
  // }

  delete(event: any) {
    // event.preventDefault();
    // this.dataService.deleteCustomer(this.customer.id)
    //   .subscribe((status: boolean) => {
    //     if (status) {
    //       this.router.navigate(['/customers']);
    //     } else {
    //       this.errorMessage = 'Unable to delete customer';
    //     }
    //   },
    //     (err) => this.logger.log(err));
  }

  // canDeactivate(): Promise<boolean> | boolean {
  // if (!this.customerForm.dirty) {
  //   return true;
  // }

  // Dirty show display modal dialog to user to confirm leaving
  // const modalContent: IModalContent = {
  //   header: 'Lose Unsaved Changes?',
  //   body: 'You have unsaved changes! Would you like to leave the page and lose them?',
  //   cancelButtonText: 'Cancel',
  //   OKButtonText: 'Leave'
  // };
  // return this.modalService.show(modalContent);
  //}
}
