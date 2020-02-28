import { Component, OnInit, Input } from '@angular/core';
import Account from '../model/Account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
  @Input() account: Account;
  categories: Array<any>;
  balanceTypes: object;

  constructor() {
    this.categories = Account.categories;
    this.balanceTypes = Object.values(Account.balanceTypes);
  }

  ngOnInit() {
  }

}
