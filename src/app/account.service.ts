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
    this.db.createIndex({
      "index": {
        "fields": [
          "number"
        ]
      },
      "type": "json"
    });
  }

  async getAccounts(): Promise<Account[]> {
    this.accounts = await this.db.find({
      selector: {
        "number": { "$exists": true }
      }
    });
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
