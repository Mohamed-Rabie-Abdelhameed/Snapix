import { Component, ViewChild } from '@angular/core';
import { CustomersServiceService } from '../services/customers-service.service';
import { Customer } from '../models/customer';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private customerAPI: CustomersServiceService, private location: Location) {}

  @ViewChild('addForm') addForm: NgForm;

  onAddCustomer(customer: {
    name: string;
    email: string;
    balance: number;
  }) {
    var newCustomer: Customer = {
      name: customer.name,
      email: customer.email,
      balance: customer.balance
    }
    this.customerAPI.createCustomer(newCustomer)}

    onCancel() {
      this.location.back();
    }
}
