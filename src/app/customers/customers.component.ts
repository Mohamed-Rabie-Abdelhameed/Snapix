import { Component } from '@angular/core';
import { CustomersServiceService } from '../services/customers-service.service';
import { Customer } from '../models/customer';
import { TransactionsServiceService } from '../services/transactions-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  constructor(
    private customerAPI: CustomersServiceService,
    private transactionsAPI: TransactionsServiceService,
    private snackbar: MatSnackBar
  ) {}

  customers: Customer[] = [];

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.customerAPI.getCustomers().subscribe((data) => {
      console.log(data);
      this.customers = data;
    });
  }


  onDelete(id: string) {
    this.customerAPI.deleteCustomer(id).subscribe((data) => {
      this.transactionsAPI.deleteUserTransactions(id);
      this.fetchCustomers();
    });
    this.snackbar.open('Customer deleted', 'OK', {
      duration: 3000,
      panelClass: ['snackbar'],
    });
  }
}
