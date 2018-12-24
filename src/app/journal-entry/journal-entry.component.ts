import { Component, OnInit, Input } from '@angular/core';
import JournalEntry from '../model/JournalEntry';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.less']
})
export class JournalEntryComponent implements OnInit {
  @Input() entry: JournalEntry;
  @Input() accounts: Account[];

  constructor() {

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

}
