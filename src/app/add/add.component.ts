import { Component, ViewChild } from '@angular/core';
import { CustomersServiceService } from '../services/customers-service.service';
import { Customer } from '../models/customer';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(
    private customerAPI: CustomersServiceService,
    private location: Location,
    private snackbar: MatSnackBar
  ) {}

  @ViewChild('addForm') addForm: NgForm;

  onAddCustomer(customer: { name: string; email: string; balance: number }) {
    var newCustomer: Customer = {
      name: customer.name,
      email: customer.email,
      balance: customer.balance,
    };
    var customerExists = false;
    this.customerAPI
      .CustomerAlreadyExists(newCustomer.email)
      .subscribe((data) => {
        customerExists = data;
        if (customerExists) {
          alert('Customer already exists');
          return;
        } else {
          this.customerAPI.createCustomer(newCustomer);
          alert('Customer added successfully');
          
          this.addForm.reset();
        }
      });
      this.snackbar.open('Customer added successfully', 'Close', {
        duration: 3000,
        // panelClass: ['green-snackbar'],
      });
  }
  onCancel() {
    this.location.back();
  }
}
