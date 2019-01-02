import JournalRecord from './JournalRecord'
import Account from './Account'

export default class JournalEntry {
  private _rev: string;
  instant: Date;
  note: string;
  journalRecords: JournalRecord[] = [];

  constructor(obj:any, accounts:Account[]) {
  	this.instant = new Date(obj._id);
  	delete obj._id;
  	this.journalRecords = obj.journalRecords.map((jr)=>new JournalRecord(jr, accounts));
  	delete obj.journalRecords;
  	Object.assign(this,obj);
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
  	return this.instant.getTime();
  }

  getCommittable(): Object {
  	let saveable: Object = {
  	  _id: this.instant.getTime(),
  	  _rev: this._rev,
  	  note: this.note,
  	  journalRecords: this.journalRecords.map((jr)=>jr.getCommittable())
  	};
  	return saveable;
  }
}