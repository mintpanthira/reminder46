import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable()
export class ContactService {  
    private _db;
    private _contact;

    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db = new PouchDB('contact.db', { adapter: 'cordova-sqlite' });
    }

    add(contact) {  
        return this._db.post(contact);
    }

    update(contact) {  
        return this._db.put(contact);
    }

    delete(contact) {  
        return this._db.remove(contact);
    }

    getAll() {  

        if (!this._contact) {
            return this._db.allDocs({ include_docs: true})
                .then(docs => {

                    // Each row has a .doc object and we just want to send an 
                    // array of contact objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this._contact = docs.rows.map(row => {
                        // Dates are not automatically converted from a string.
                        return row.doc;
                    });

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true})
                        .on('change', this.onDatabaseChange);

                    return this._contact;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._contact);
        }
    }

    private onDatabaseChange = (change) => {  
        var index = this.findIndex(this._contact, change.id);
        var contact = this._contact[index];

        if (change.deleted) {
            if (contact) {
                this._contact.splice(index, 1); // delete
            }
        } else {
            if (contact && contact._id === change.id) {
                this._contact[index] = change.doc; // update
            } else {
                this._contact.splice(index, 0, change.doc) // insert
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