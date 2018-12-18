import JournalRecord from './JournalRecord'

export default class JournalEntry {
  instant: Date;
  note: string;
  journalRecords: JournalRecord[];
}