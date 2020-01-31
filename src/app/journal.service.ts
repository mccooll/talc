import { Injectable, OnInit } from '@angular/core';
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

  constructor(private accountService: AccountService, private data: DatabaseService) {
  	this.db = this.data.db;
  }

  getEntries(filter:object): Observable<JournalEntry[]> {
    let accounts = this.accountService.getAccounts();
    return new Observable((observer) => {
      let entries: JournalEntry[] = []; 
      this.db.allDocs({
        include_docs: true,
        descending: true
      }).then((result) => {
        entries = [];
        result.rows.forEach((row)=> {
          entries.push(new JournalEntry(row.doc,accounts));
        });
        observer.next(entries);
      });
    });
  }

  deleteEntry(j: JournalEntry): JournalEntry[] {
    this.db.remove(j.getCommittable());
  	return deleted;
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
