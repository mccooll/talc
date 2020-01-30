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
  remotedb: any;

  constructor(private accountService: AccountService, private data: DatabaseService) {
  	this.db = this.data.db;
    this.remotedb = this.data.remotedb;
    const sync = this.db.sync(this.remotedb, {
      live: true,
      retry: true
    });
    const getSyncAsObservable = bindCallback(sync.on);
    getSyncAsObservable.call(sync, 'change').subscribe(x => console.log(x), e => console.error(e));
    // const result = getSyncAsObservable('change');
    // result.subscribe(x => console.log(x), e => console.error(e));
    // .on('change', function (change) {
    //   console.log(change);
    //   this.getEntries();
    // });
  }

  getEntries(filter:object): Observable<JournalEntry[]> {
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
  	return of(this.entries);
  }

  deleteEntry(j: JournalEntry): JournalEntry[] {
  	let index = this.entries.indexOf(j);
  	let deleted: JournalEntry[] = this.entries.splice(index,1);
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
