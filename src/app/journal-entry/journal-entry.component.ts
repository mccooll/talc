import { Component, OnInit, Input } from '@angular/core';
import JournalEntry from '../model/JournalEntry';
import JournalRecord from '../model/JournalRecord';
import { Observable } from 'rxjs';
import { JournalService } from '../journal.service'

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.less']
})
export class JournalEntryComponent implements OnInit {
  @Input() entry: JournalEntry;
  @Input() accounts: Account[];
  private blankRecord: JournalRecord;
  private deleting: Boolean;

  constructor(private journalService: JournalService) {
  	//this.blankRecord$.subscribe(jr => console.log(jr));
  	this.blankRecord = new JournalRecord();
  	this.blankRecord.account = null;
  	this.blankRecord.credit = null;
  	this.blankRecord.debit = null;
  }

  ngOnInit() {
  }

  get instantFormatted() {
  	return this.entry.instant.toISOString().substring(0, 10);
  }

  set instantFormatted(e) {
  	let newDate = new Date(e);
  	this.entry.instant.setTime(newDate.getTime());
  }

  deleteRecord(index) {
  	let deleted = this.entry.journalRecords.splice(index,1);
  	console.log(this.entry);
  	return deleted;
  }

  delete() {
  	//hacky
  	this.deleting = true;
  	setTimeout(()=> {
  	  this.journalService.deleteJournal(this.entry);
  	}, 1000);
  }

  onChange() {
  	let newRecord = new JournalRecord();
  	newRecord.account = this.blankRecord.account;
  	newRecord.amount = this.blankRecord.amount;
  	this.entry.journalRecords.push(newRecord);
  	this.blankRecord.account = null;
  	this.blankRecord.amount = null;
  	//problem here: this is not updating in the view (neither account nor amount): it's like the binding is one-way. I wonder if an observable would fix this -> event to observable
  }
}
