import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable()
export class ReminderService {  
    private _db;
    private _reminder;

    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db = new PouchDB('reminder.db', { adapter: 'cordova-sqlite' });
    }

    add(reminder) {  
        return this._db.post(reminder);
    }

    update(reminder) {  
        return this._db.put(reminder);
    }

    delete(reminder) {  
        return this._db.remove(reminder);
    }

    getAll() {  

        if (!this._reminder) {
            return this._db.allDocs({ include_docs: true})
                .then(docs => {

                    // Each row has a .doc object and we just want to send an 
                    // array of reminder objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this._reminder = docs.rows.map(row => {
                        // Dates are not automatically converted from a string.
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true})
                        .on('change', this.onDatabaseChange);

                    return this._reminder;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._reminder);
        }
    }
   
    private onDatabaseChange = (change) => {  
        var index = this.findIndex(this._reminder, change.id);
        var reminder = this._reminder[index];

        if (change.deleted) {
            if (reminder) {
                this._reminder.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (reminder && reminder._id === change.id) {
                this._reminder[index] = change.doc; // update
            } else {
                this._reminder.splice(index, 0, change.doc) // insert
            }
        }
    }

    // Binary search, the array is by default sorted by _id.
    private findIndex(array, id) {  
        var low = 0, high = array.length, mid;
        while (low < high) {
        mid = (low + high) >>> 1;
        array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }

}