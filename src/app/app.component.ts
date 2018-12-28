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
  entries: JournalEntry[];
  accounts: Account[];

  constructor() {
  	this.entries = [];
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
  	this.entries[0] = new JournalEntry();
  	this.entries[0].instant = new Date();
  	this.entries[0].note = "Purchased sporting goods for the community room.";
  	let a = new JournalRecord();
  	let b = new JournalRecord();
  	a.amount = 42.33;
  	a.account = cash;
  	b.amount = -42.33;
  	b.account = expense;
  	this.entries[0].journalRecords = [];
  	this.entries[0].journalRecords.push(a);
  	this.entries[0].journalRecords.push(b);
  	this.entries[0].journalRecords.push(new JournalRecord());
  	this.entries[1] = new JournalEntry();
  	this.entries[1].instant = new Date(new Date().setDate(new Date().getDate()-1));
  	this.entries[1].note = "Bill for chewing gum.";
  	let c = new JournalRecord();
  	let d = new JournalRecord();
  	c.amount = 4.33;
  	c.account = cash;
  	d.amount = -4.33;
  	d.account = expense;
  	this.entries[1].journalRecords = [];
  	this.entries[1].journalRecords.push(c);
  	this.entries[1].journalRecords.push(d);
  	this.accounts = [cash,expense];
  }
}
