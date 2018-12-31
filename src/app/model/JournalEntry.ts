import JournalRecord from './JournalRecord'

export default class JournalEntry {
  _id: string;
  instant: Date;
  note: string;
  journalRecords: JournalRecord[];
}