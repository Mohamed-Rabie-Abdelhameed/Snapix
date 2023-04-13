import { Component } from '@angular/core';
import { CustomersServiceService } from '../services/customers-service.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  constructor(private customerAPI: CustomersServiceService) { }

  customers: Customer[] = [];

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.customerAPI.getCustomers().subscribe((data) => {
      console.log(data);
      this.customers = data;
    })
  }

  editCustomer(customer: Customer) {
    
  }

  onDelete(id: string) {
    this.customerAPI.deleteCustomer(id).subscribe((data) => {
      this.fetchCustomers();
    })
  }

}
