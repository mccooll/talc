import { Component, OnInit, Input } from '@angular/core';
import JournalEntry from '../model/JournalEntry';


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.less']
})
export class JournalComponent implements OnInit {
  @Input() entries: JournalEntry[];
  @Input() accounts: Account[];
  blankEntry: JournalEntry;

  constructor() {
  	this.blankEntry = new JournalEntry();
  }

  ngOnInit() {
  }

  addValidBlank():void {
  	console.log('gotit');
  	let newEntry = this.blankEntry;
  	this.entries.push(newEntry);
  	setTimeout(()=> {
  	  this.blankEntry = new JournalEntry();
  	})
  	//problem here: typing in a number immediately creates a new record and interrupts input focus (maybe we need a debounce delay on this with an observable)
  	//another problem: it's added to the bottom
  	return;
  }
}