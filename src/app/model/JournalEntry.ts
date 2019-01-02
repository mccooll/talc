import JournalRecord from './JournalRecord'

export default class JournalEntry {
  _id: string;
  instant: Date;
  note: string;
  journalRecords: JournalRecord[] = [];

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
}