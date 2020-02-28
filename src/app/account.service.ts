import { Injectable } from '@angular/core';
import Account from './model/Account'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: Account[];

  constructor() {
  	this.accounts = [];
  }

  getAccounts(): Account[] {
    return this.accounts;
  }
}
