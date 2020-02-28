import { Component, OnInit, Input } from '@angular/core';
import JournalEntry from '../model/JournalEntry';
import Account from '../model/Account';
import { bindCallback, Observable, of } from 'rxjs';
import { JournalService } from '../journal.service'

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.less']
})
export class JournalComponent implements OnInit {
  entries$: Observable<JournalEntry[]>;
  @Input() accounts: Account[];
  blankEntry: JournalEntry;
  blankAccount: Account;

  constructor(private journalService: JournalService) {
  	this.blankEntry = new JournalEntry();
    this.blankAccount = new Account();
  }

  ngOnInit() {
    this.entries$ = this.journalService.getEntries({start:0});
  }

  addValidBlank():void {
  	let newEntry = this.blankEntry;
  	//this.entries.unshift(newEntry); //we may want to insert the record in order, although this seems to defeat the ability to easily continue editing. this.entries.find(Date>newentry.date)
  	setTimeout(()=> {
  	  this.blankEntry = new JournalEntry();
  	})
  	//problem here: typing in a number immediately creates a new record and interrupts input focus (maybe we need a debounce delay on this with an observable)
  	//another problem: it's added to the bottom (unshift instead of push)
  	return;
  }
}