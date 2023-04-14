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
          this.snackbar.open('Customer already exists', 'Ok', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          return;
        } else {
          this.customerAPI.createCustomer(newCustomer);
          this.snackbar.open('Customer added successfully', 'Ok', {
            duration: 3000,
            panelClass: ['snackbar'],
          });
          this.addForm.reset();
        }
      });
  }
  onCancel() {
    this.location.back();
  }
}
