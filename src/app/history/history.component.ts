import { Component } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionsServiceService } from '../services/transactions-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  constructor(private transactionsAPI: TransactionsServiceService) {}

  transactions: Transaction[] = [];

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.transactionsAPI.getTransactions().subscribe((data) => {
      console.log(data);
      this.transactions = data;
    });
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

}
