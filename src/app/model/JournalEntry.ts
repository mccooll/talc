import JournalRecord from './JournalRecord'
import Account from './Account'

export default class JournalEntry {
  private _rev: string;
  instant: Date;
  note: string;
  journalRecords: JournalRecord[] = [];

  constructor(obj?:any, accounts?:Account[]) {
  	if(obj && accounts) {
	  this.instant = new Date(parseInt(obj._id,10));
	  delete obj._id;
	  this.journalRecords = obj.journalRecords.map((jr)=>new JournalRecord(jr, accounts));
	  delete obj.journalRecords;
	  Object.assign(this,obj);
	}
  }

  isValid(): Boolean {
  	if(!this.instant) {
  		return false;
  	}
  	if(!this.note) {
  		return false;
  	}
  	if(this.journalRecords.length < 1) {
  		return false;
  	}
  	let balance: number = 0;
  	if(
  	  !this.journalRecords.every((jr) => {
  		return jr.account && jr.amount !== null
  	  })
  	) {
  		return false;
  	}
  	this.journalRecords.forEach((jr) => {
  		balance += jr.amount;
  	});
  	if(balance !== 0) {
  		return false;
  	}
  	return true;
  }

  private getId() {
  	return this.instant.getTime().toString();
  }

  getCommittable(): Object {
  	let saveable: Object = {
  	  _id: this.getId(),
  	  _rev: this._rev,
  	  note: this.note,
  	  journalRecords: this.journalRecords.sort((r1,r2) => r2.debit >= r1.debit ? 1 : -1).map((jr)=>jr.getCommittable())
  	};
  	return saveable;
  }

  setRev(rev:string) {
    this._rev = rev;
  }
}