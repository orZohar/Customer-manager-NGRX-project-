import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Customer, Order } from 'src/app/shared/interfaces';
import { OrdersService } from '../../orders/orders.service';
import { CustomersService } from '../../customers/customers.service';
import { Dictionary } from '@ngrx/entity';
import { setNewOrder } from '../actions/orders.actions';
import { pushNewOrder } from '../../customers/actions/customers.actions';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  states = [];
  order$: Observable<Order>;

  customer: Order =
    {
      id: null,
      productName: '',
      itemPrice: null,
      //  dateOfPurchase: '',
      quantity: null,
      totalPrice: null,
      customerId: null,
    };
  // states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';

  orderForm: FormGroup;
  editCustomerId: number;

  text: string;
  results: Customer[];
  filteredCustomers: any[];
  currentCustomerId: number;



  search(event) {
    var a = this.store$.pipe(
      select('entityCache', 'Customer', 'entities'),
      map((customers: Dictionary<Customer>) => {
        const customersArray: Customer[] = [];
        for (let customer of Object.values(customers)) {
          customersArray.push(customer);
        }
        return customersArray;
      })
    ).subscribe(result => {
      this.results = result;

      this.filterCustomers(event);
    })

  }

  filterCustomers(event) {
    console.log("hello")
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.results.length; i++) {
      let firstName = this.results[i].firstName;
      let lastName = this.results[i].lastName;
      if (firstName.toLowerCase().indexOf(query.toLowerCase()) == 0 || lastName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        var fullname = this.results[i].firstName + " " + this.results[i].lastName;
        filtered.push(fullname);
        this.currentCustomerId = this.results[i].id;
      }
    }
    this.filteredCustomers = filtered;
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store$: Store<any>,
    private ordersService: OrdersService,
    private CustomersService: CustomersService,
    private fb: FormBuilder) {
    // use FormBuilder to create a form group
    this.orderForm = this.fb.group({
      'productName': ['', Validators.required],
      'itemPrice': ['', Validators.required],
      'quantity': ['', Validators.required],
      'totalPrice': ['', Validators.required],
      'id': ['', Validators.required]
    });
  }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Don't technically need that here
    // since param won't be changing while component is alive.
    // Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.params.subscribe((params: Params) => {
      this.editCustomerId = +params['id'];

      this.order$ = this.store$.pipe(
        select('entityCache', 'Order', 'entities', this.editCustomerId),
        map((order: Order) => {
          if (order) {
            this.orderForm.patchValue(order);
          }
          return order;
        })
      )

      if (this.editCustomerId) {
        this.operationText = 'Update';
      }
    });

    // this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }


  assignFullNameToId(event) {
    // we do this to present fullname in primeNG, it will be converted later to id before sending to the server
    this.orderForm.controls.id.setValue(event);
  }


  submit() {
    var obj = null;
    if (this.orderForm.invalid) {
      // this.errMessage = "Please fill up the form correctly"
      return;
    }

    this.orderForm.controls.id.setValue(this.currentCustomerId);
    obj = this.orderForm.value;
    obj.id = this.currentCustomerId;

    //const credentials = this.orderForm.value;
    // if (this.operationText === "Update") {
    //   this.ordersService.update(credentials).subscribe((result: Order) => {
    //    // this.store$.dispatch(setNewCustomer({ id: result.id }))
    //    this.router.navigate(['/orders']);
    //   });
    // } else {

    this.ordersService.add(obj).subscribe((result: Order) => {

      // it's either call all customers again because they were updated in the server, or update the store temporarliy.. what's the best practice?
      this.CustomersService.getAll();
      this.router.navigate(['/orders']);
    });
    // }
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
