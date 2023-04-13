import { Component, OnInit } from '@angular/core';
import { CustomersServiceService } from '../services/customers-service.service';
import { Customer } from '../models/customer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css'],
})
export class CustomerViewComponent implements OnInit {
  customer: Customer;
  transactions: any = [
    { date: '2019-01-01', amount: 1550 },
    { date: '2019-01-02', amount: 666 },
    { date: '2019-01-03', amount: 777 },
    { date: '2019-01-04', amount: 888 },
    { date: '2019-01-05', amount: 999 },
    { date: '2019-01-01', amount: 1550 },
    { date: '2019-01-02', amount: 666 },
    { date: '2019-01-03', amount: 777 },
    { date: '2019-01-04', amount: 888 },
    { date: '2019-01-05', amount: 999 },

  ];
  id: string;
  constructor(
    private customersAPI: CustomersServiceService,
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
    });
  }
}
