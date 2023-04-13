import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersServiceService {
  private url = 'https://snapi-x-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer) {
    return this.http.post<{
      name: string;
      email: string;
      balance: number;
    }>(`${this.url}/customers.json`, customer).subscribe((responseData) => {
      console.log(responseData);
    });
  }

  getCustomers() {
    return this.http.get<{ [key: string]: Customer }>(`${this.url}/customers.json`).pipe(
      map((responseData) => {
        const customersArray: Customer[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            customersArray.push({ ...responseData[key], id: key });
          }
        }
        return customersArray;
      })
    );
  }

  getCustomer(id: string) {
    return this.http.get<Customer>(`${this.url}/customers/${id}.json`);
  }

  updateCustomer(id: string, customer: Customer) {
    return this.http.patch(`${this.url}/customers/${id}.json`, customer);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${this.url}/customers/${id}.json`);
  }
}
