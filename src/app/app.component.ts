import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import JournalEntry from './model/JournalEntry'
import Account from './model/Account'
import { AccountService } from './account.service'
import { bindCallback, Observable, of } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit  {
  accounts: Account[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  	this.accounts = this.accountService.getAccounts();
  }
}
