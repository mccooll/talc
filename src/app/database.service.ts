import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { bindCallback, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  db:any;
  remotedb:any;
  syncing:Observable;

  constructor() {
  	const user = localStorage.getItem('user') || 'default';
  	const password =  localStorage.getItem('password') || 'default';
  	const serverAddress =  localStorage.getItem('server') ||'default';
  	const remoteDatabaseName =  localStorage.getItem('database') || 'default';
  	const remoteDatabasePort = 5984;
  	const localDatabaseName = remoteDatabaseName;

  	this.db = new PouchDB(localDatabaseName);
    this.remotedb = new PouchDB(`http://${user}:${password}@${serverAddress}:${remoteDatabasePort}/${remoteDatabaseName}`);
    const sync = this.db.sync(this.remotedb, {
      live: true,
      retry: true
    });
    const getSyncAsObservable = bindCallback(sync.on);
    this.syncing = getSyncAsObservable.call(sync, 'change');
  }
}
