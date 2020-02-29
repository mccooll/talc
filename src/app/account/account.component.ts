import { Component, OnInit, Input } from '@angular/core';
import Account from '../model/Account';
import { AccountService } from '../account.service'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
  @Input() account: Account;
  categories: Array<any>;
  balanceTypes: object;
  private updates : Subject<Account> = new Subject();

  constructor(private accountService: AccountService) {
    this.categories = Account.categories;
    this.balanceTypes = Object.values(Account.balanceTypes);
    this.updates.pipe(debounceTime(1500)).subscribe(a =>{
       this.commit(a);
    });
  }

  ngOnInit() {
  }

  onChange() {
    this.updates.next(this.account);
  }

  commit(a:Account) {
    console.log(a);
    if(a.isValid()) {
      console.log(a);
      this.accountService.commitEntry(a);
    }
  }
}
