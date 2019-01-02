import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() blanket: EventEmitter<any> = new EventEmitter();
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
  	return this.entry.instant ? this.entry.instant.toISOString().substring(0, 10) : null;
  }

  set instantFormatted(e) {
  	let newDate = new Date(e);
  	if(!this.entry.instant) {
  		this.entry.instant = new Date();
  	}
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

  onBlankChange() {
  	let newRecord = new JournalRecord();
  	newRecord.account = this.blankRecord.account;
  	newRecord.amount = this.blankRecord.amount;
  	this.entry.journalRecords.push(newRecord);
  	setTimeout(()=> {
  	  this.blankRecord.account = null;
  	  this.blankRecord.amount = null;
  	})
  	this.onChange();
  	//problem here: typing in a number immediately creates a new record and interrupts input focus (maybe we need a debounce delay on this with an observable)
  }

  onChange() {
  	if(this.entry.isValid()) {
  	  this.blanket.emit(null);
  	}
  }
}
