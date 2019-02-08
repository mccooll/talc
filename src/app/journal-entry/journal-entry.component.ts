import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
  @ViewChild('records') records: any;
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
  	//console.log(this.entry.instant ? this.entry.instant.toISOString().substring(0, 10) : null);
  	return this.entry.instant ? this.entry.instant.toISOString().substring(0, 10) : null;
  }

  set instantFormatted(e) {
  	//need to try to keep the same hours, seconds, milliseconds on edits
  	//console.log(e);
  	//let newDate = new Date(Date.UTC(e));
  	let newDate = new Date(e);
  	let now = new Date();
  	//console.log(newDate);
  	newDate.setHours(now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds());
  	//console.log(newDate);
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
        let index = 1;
        if(this.entry.journalRecords[this.entry.journalRecords.length-1].debit > 0)
        {
          index = 0;
        }
        this.records.nativeElement.lastChild.getElementsByTagName('input')[index].focus(); // this is awkward, also a user preference
      });
    }
  }

  onChange() {
  	if(this.entry.isValid()) {
  	  this.blanket.emit(null);
  	  this.journalService.commitEntry(this.entry);
  	}
  }
}
