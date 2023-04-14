import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsServiceService {
  private url = 'https://snapi-x-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {}

  createTransaction(transaction: Transaction) {
    return this.http
      .post<{
        sender: string;
        receiver: string;
        amount: number;
        date: Date;
      }>(`${this.url}/transactions.json`, transaction)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
  getTransactions() {
    return this.http
      .get<{ [key: string]: Transaction }>(`${this.url}/transactions.json`)
      .pipe(
        map((responseData) => {
          const transactionsArray: Transaction[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              transactionsArray.push({ ...responseData[key], id: key });
            }
          }
          return transactionsArray;
        })
      );
  }
  getUserTransactions(email: string) {
    return this.http
      .get<{ [key: string]: Transaction }>(`${this.url}/transactions.json`)
      .pipe(
        map((responseData) => {
          const transactionsArray: Transaction[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              if (
                responseData[key].sender === email ||
                responseData[key].receiver === email
              ) {
                transactionsArray.push({ ...responseData[key], id: key });
              }
            }
          }
          return transactionsArray;
        })
      );
  }
  deleteUserTransactions(id: string) {
    let userTransactions: Transaction[] = [];
    this.getUserTransactions(id).subscribe((data) => {
      userTransactions = data;
    }
    );
    for (let i = 0; i < userTransactions.length; i++) {
      this.http.delete(`${this.url}/transactions/${userTransactions[i].id}.json`);
    }
  }
}
