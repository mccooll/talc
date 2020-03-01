import { Injectable, OnInit, NgZone } from '@angular/core';
import { AccountService } from './account.service'
import { DatabaseService } from './database.service'
import JournalEntry from './model/JournalEntry'
import JournalRecord from './model/JournalRecord'
import { bindCallback, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  entries: JournalEntry[] = [];
  db: any;

  constructor(private accountService: AccountService, private data: DatabaseService, private _ngZone: NgZone) {
  	this.db = this.data.db;
    this.db.createIndex({
      "index": {
        "fields": [
          "journalRecords.account"
        ]
      },
      "type": "json"
    });
  }

  getEntries(filter:object): Observable<JournalEntry[]> {
    return new Observable((observer) => {
      this.query(filter).then((entries) => observer.next(entries));
      this.data.syncing.subscribe(() => {
        console.log('syncing')
        this.query(filter).then((entries) => {
          console.log(entries)
          this._ngZone.run(() => {
            observer.next(entries)
          });
        });
      });
    });
  }

  async query(filter:object): Promise<JournalEntry[]> {
    let accounts = await this.accountService.getAccounts();
    let entries: JournalEntry[] = []; 
    let result = await this.db.find({
      // selector: {
      //   "journalRecords": { "$exists": true }
      // }
      selector: {
        "journalRecords": {
          "$elemMatch": 
          {
            "account": 0
          }
        }
      }
    });
    console.log('hola')
    console.log(result)
    // let result = await this.db.allDocs({
    //   include_docs: true,
    //   descending: true
    // });
    // console.log(result);
    // entries = [];
    result.rows.forEach((row)=> {
      entries.push(new JournalEntry(row.doc,accounts));
    });
    //console.log(entries);
    return entries;
  }

  deleteEntry(j: JournalEntry): void {
    this.db.remove(j.getCommittable());
  }

  commitEntry(j: JournalEntry): Boolean {
  	this.db.put(j.getCommittable()).then(function (response) {
      if(response && response.ok && response.rev) {
        j.setRev(response.rev);
      }
    });
  	return true;
  }
}