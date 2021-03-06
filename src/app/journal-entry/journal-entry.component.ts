import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import JournalEntry from '../model/JournalEntry';
import JournalRecord from '../model/JournalRecord';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { JournalService } from '../journal.service'

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.less']
})
export class JournalEntryComponent implements OnInit {
  @ViewChild('records', {static: false}) records: any;
  @Input() entry: JournalEntry;
  @Input() accounts: Account[];
  @Input() editing: Boolean;
  @Output() blanket: EventEmitter<any> = new EventEmitter();
  private blankRecord: JournalRecord;
  private deleting: Boolean;
  private updates : Subject<JournalEntry> = new Subject();

  constructor(private journalService: JournalService) {
  	this.blankRecord = new JournalRecord();
  	this.blankRecord.account = null;
  	this.blankRecord.credit = null;
  	this.blankRecord.debit = null;
    this.updates.pipe(debounceTime(1500)).subscribe(j =>{
       this.commit(j);
    });
  }

  ngOnInit() {
  }

  get instantFormatted() {
  	return this.entry.instant ? this.entry.instant.toISOString().substring(0, 10) : null;
  }

  set instantFormatted(e) {
  	//need to try to keep the same hours, seconds, milliseconds on edits
  	let newDate = new Date(e);
  	let now = new Date();
  	newDate.setHours(now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds());
  	if(!this.entry.instant) {
  		this.entry.instant = new Date();
  	}
  	this.entry.instant.setTime(newDate.getTime());
  }

  deleteRecord(index) {
  	let deleted = this.entry.journalRecords.splice(index,1);
  	console.log(this.entry);
    this.onChange();
  	return deleted;
  }

  delete() {
  	//hacky
  	this.deleting = true;
  	setTimeout(()=> {
  	  this.journalService.deleteEntry(this.entry);
  	}, 1000);
  }

  onBlankRecordChange() {
    if(this.blankRecord.account || this.blankRecord.amount) {
      let newRecord = new JournalRecord();
      newRecord.account = this.blankRecord.account;
      newRecord.amount = this.blankRecord.amount;
      this.entry.journalRecords.push(newRecord);
      this.onChange();
      setTimeout(()=> {
        this.blankRecord.account = null;
        this.blankRecord.amount = null;
      });
      setTimeout(()=> {
        this.records.nativeElement.lastChild.getElementsByTagName('input')[0].focus(); // this is awkward, also a user preference
      });
    }
  }

  onChange() {
    this.updates.next(this.entry);
  }

  commit(j) {
    if(j.isValid()) {
      this.blanket.emit(null);
      this.journalService.commitEntry(j);
    }
  }
}