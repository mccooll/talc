import { Injectable } from '@angular/core';
import Account from './model/Account'
import { DatabaseService } from './database.service'


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: Account[];
  db: any;

  constructor(private data: DatabaseService) {
  	this.accounts = [];
    this.db = this.data.db;
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  commitEntry(a: Account): Boolean {
    this.db.put(a.getCommittable());//.then(function (response) {
    //   if(response && response.ok && response.rev) {
    //     a.setRev(response.rev);
    //   }
    // });
    return true;
  }
}
