import Account from './Account'
import JournalEntry from './JournalEntry'

export default class JournalRecord {
  amount: number;
  account: Account;
  journalEntry: JournalEntry;
}