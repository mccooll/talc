import Account from './Account'
import JournalEntry from './JournalEntry'

export default class JournalRecord {
  amount: number;
  account: Account;
  journalEntry: JournalEntry;

  constructor(obj: any, accounts: Account[]) {
  	this.amount = obj.amount;
  	this.account = accounts.find((a)=>a.number===obj.number);
  }

  get debit() {
  	return this.amount > 0 ? this.amount: null;
  }

  set debit(n) {
  	if(n===null || n > 0) this.amount = n;
  }

  get credit() {
  	return this.amount < 0 ? -1*this.amount: null;
  }

  set credit(n) {
  	if(n > 0) this.amount = -1*n;
  	else if(n===null) this.amount = n;
  }

  getCommittable(): Object {
  	let saveable: Object = {
  	  amount: this.amount,
  	  account: this.account.number
  	};
  	return saveable;
  }
}