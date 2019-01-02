import { Injectable, OnInit } from '@angular/core';
import { AccountService } from './account.service'
import JournalEntry from './model/JournalEntry'
import JournalRecord from './model/JournalRecord'

@Injectable({
  providedIn: 'root'
})
export class JournalService implements OnInit {
  entries: JournalEntry[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  }

  getJournals(): JournalEntry[] {
  	let accounts = this.accountService.getAccounts();
  	let cash = accounts[0];
  	let expense = accounts[1];
  	this.entries = [];
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
  	this.entries[1]._id = "mittens";
  	console.log('hi');
  	console.log(this.entries);
  	return this.entries;
  }

  deleteJournal(j: JournalEntry): JournalEntry[] {
  	let index = this.entries.indexOf(j);
  	let deleted: JournalEntry[] = this.entries.splice(index,1);
  	return deleted;
  }
}
