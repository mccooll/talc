import { Injectable, OnInit } from '@angular/core';
import { AccountService } from './account.service'
import JournalEntry from './model/JournalEntry'
import JournalRecord from './model/JournalRecord'
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  entries: JournalEntry[] = [];
  db: any;
  remotedb: any;

  constructor(private accountService: AccountService) {
  	this.db = new PouchDB('talc-test');
    this.remotedb = new PouchDB('http://rave:amazingbsd@192.168.1.11:5985/talc-test');
    console.log('constructed');
    this.db.sync(this.remotedb, {
      live: true,
      retry: true
    });
  }

  getEntriesOld(): JournalEntry[] {
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
  	//this.entries[1]._id = "mittens";
  	console.log('hi');
  	console.log(this.entries);
  	return this.entries;
  }

  getEntries(filter:object): JournalEntry[] {
  	//uh oh - async - we gonna need observables
  	let accounts = this.accountService.getAccounts();
  	this.db.allDocs({
  		include_docs: true,
      descending: true
  	}).then((result) => {
  	  console.log(result.rows);
  	  result.rows.forEach((row)=> {
  	  	this.entries.push(new JournalEntry(row.doc,accounts));
  	  });
  	  console.log(this.entries);
  	});
  	// filter.start
  	// filter.end
  	return this.entries;
  }

  deleteEntry(j: JournalEntry): JournalEntry[] {
  	let index = this.entries.indexOf(j);
  	let deleted: JournalEntry[] = this.entries.splice(index,1);
    this.db.remove(j.getCommittable());
  	return deleted;
  }

  commitEntry(j: JournalEntry): Boolean {
  	this.db.put(j.getCommittable());
  	return true;
  }
}
