import { Injectable } from '@angular/core';
import Account from './model/Account'
import AccountType from './model/AccountType'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: Account[];

  constructor() {
  	let dr = new AccountType();
  	dr.code = false;
  	let cr = new AccountType();
  	cr.code = true;
  	const accountTypes = [dr,cr];
  	let cash = new Account();
  	let expense = new Account();
  	cash.name = "Cash";
  	cash.number = 0;
  	cash.accountType = dr;
  	expense.name = "Expense";
  	expense.number = 1;
  	expense.accountType = cr;
  	this.accounts = [cash,expense];
  }

  getAccounts(): Account[] {
    return this.accounts;
  }
}
