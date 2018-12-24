import { Component } from '@angular/core';
import JournalEntry from './model/JournalEntry'
import JournalRecord from './model/JournalRecord'
import Account from './model/Account'
import AccountType from './model/AccountType'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'TALC';
  entry = new JournalEntry();
  accounts: Account[];

  constructor() {
  	this.entry.instant = new Date();
  	this.entry.note = "Purchased sporting goods for the community room.";
  	let dr = new AccountType();
  	dr.code = false;
  	let cr = new AccountType();
  	cr.code = true;
  	const accountTypes = [dr,cr];
  	let cash = new Account();
  	let expense = new Account();
  	cash.name = "Cash";
  	cash.number = 0;
  	cash.accountType = dr;
  	expense.name = "Expense";
  	expense.number = 1;
  	expense.accountType = cr;
  	let a = new JournalRecord();
  	let b = new JournalRecord();
  	a.amount = 42.33;
  	a.account = cash;
  	b.amount = -42.33;
  	b.account = expense;
  	this.entry.journalRecords = [];
  	this.entry.journalRecords.push(a);
  	this.entry.journalRecords.push(b);
  	this.accounts = [cash,expense];
  }
}
