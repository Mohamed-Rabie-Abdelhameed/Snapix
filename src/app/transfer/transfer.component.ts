import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsServiceService } from '../services/transactions-service.service';
import { NgForm } from '@angular/forms';
import { Transaction } from '../models/transaction';
import { Location } from '@angular/common';
import { CustomersServiceService } from '../services/customers-service.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit{
  constructor(
    private customersAPI: CustomersServiceService,
    private transactionsAPI: TransactionsServiceService,
    private location: Location
  ) {}

  customers: Customer[] = [];
  senderCustomer: Customer;
  receiverCustomer: Customer;

  ngOnInit() {
    this.customersAPI.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }


  @ViewChild('transferForm') addForm: NgForm;

  onTransfer(transaction: {
    amount: number;
    sender: string;
    receiver: string;
  }) {
    var newTransaction: Transaction = {
      amount: transaction.amount,
      sender: transaction.sender,
      receiver: transaction.receiver,
      date: new Date(),
    };
    this.senderCustomer = this.customers.find(
      (customer) => customer.email === transaction.sender
    );
    this.receiverCustomer = this.customers.find(
      (customer) => customer.email === transaction.receiver
    );
    if(this.senderCustomer.id === this.receiverCustomer.id){
      alert("Sender and Receiver cannot be same");
      return;
    }
    else if (this.senderCustomer.balance < transaction.amount) {
      alert('Insufficient Balance');
      return;
    }
    else if (transaction.amount <= 0) {
      alert('Invalid Amount');
      return;
    }else{
    this.senderCustomer.balance -= transaction.amount;
    this.receiverCustomer.balance += transaction.amount;
    this.customersAPI.updateCustomer(this.senderCustomer.id, this.senderCustomer);
    this.customersAPI.updateCustomer(this.receiverCustomer.id, this.receiverCustomer);
    this.transactionsAPI.createTransaction(newTransaction);
    alert('Transaction Successful');}
    this.addForm.reset();
  }

  

  onCancel() {
    this.location.back();
  }
}
