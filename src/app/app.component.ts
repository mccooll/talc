import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import JournalEntry from './model/JournalEntry'
import Account from './model/Account'
import { AccountService } from './account.service'
import { JournalService } from './journal.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit  {
  title = 'TALC';
  entries: JournalEntry[];
  accounts: Account[];

  constructor(private accountService: AccountService, private journalService: JournalService) {


  }

  ngOnInit() {
  	this.entries = this.journalService.getEntries({start:0});
  	//console.log(this.entries);
  	this.accounts = this.accountService.getAccounts();
  	//var db = new PouchDB('kittens');
  	//var db2 = new PouchDB('http://dave:pwd@10.1.1.148:5985/kittens');
 //  	var syncHandler = db.sync(db2, {
	//   live: true,
	//   retry: true
	// }).on('change', function (change) {
	//   // yo, something changed!
	//   console.log(change);
	// });
 //  	db2.info().then(function (info) {
	//   console.log(info);
	// })
  	//db.put(this.entries[1]);
 //  	db.get('mittens').then(function (doc) {
	//   console.log(doc);
	//   //doc.note = "Bill for chewing gum..";
	//   //return db.put(doc);
	//   //db.remove(doc);
	// });
  }
}
