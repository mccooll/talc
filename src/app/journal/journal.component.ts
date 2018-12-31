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

  constructor() { }

  ngOnInit() {
  }

}