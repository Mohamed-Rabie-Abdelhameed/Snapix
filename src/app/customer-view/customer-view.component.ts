import { Component, OnInit } from '@angular/core';
import { CustomersServiceService } from '../services/customers-service.service';
import { Customer } from '../models/customer';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionsServiceService } from '../services/transactions-service.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css'],
})
export class CustomerViewComponent implements OnInit {
  customer: Customer;
  transactions: Transaction[] = [];
  id: string;
  constructor(
    private customersAPI: CustomersServiceService,
    private transactionsAPI: TransactionsServiceService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.fetchCustomer(this.id);
  }
  fetchCustomer(id: string) {
    this.customersAPI.getCustomer(id).subscribe((data) => {
      console.log(data);
      this.customer = data;
      this.fetchTransactions(this.customer.email);
    });
  }

  fetchTransactions(email: string) {
    this.transactionsAPI.getUserTransactions(email).subscribe((data) => {
      console.log(data);
      this.transactions = data;
    });
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleString();
  }
}
