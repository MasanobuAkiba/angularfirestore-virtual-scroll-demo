import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { QueryFn, Action, DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { DocumentReference, DocumentSnapshot, Transaction, DocumentData } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as Models from 'app/models';

export abstract class DbAbstract<T> {

    protected abstract readonly CollectionPath: string;

    constructor(
        protected db: AngularFirestore
    ) { }

    get batch() {
        return this.db.firestore.batch();
    }

    public getDocumentByKey(key: string): AngularFirestoreDocument<T> {
        return this.getCollection().doc(key);
    }

    public getCollection(queryFn?: QueryFn): AngularFirestoreCollection<T> {
        return this.db.collection<T>(this.CollectionPath, queryFn);
    }

    public findList(queryFn?: QueryFn): Observable<T[]> {
        return this.getCollection(queryFn).snapshotChanges().map(this.actionsToObjects.bind(this));
    }

    public findByKey(key: string): Observable<T> {
        return this.getDocumentByKey(key).snapshotChanges().map(this.actionToObject.bind(this));
    }

    private actionToObject(action: Action<DocumentSnapshot>): T {
        return this.defineModelId(action.payload);
    }

    private actionsToObjects(actions: DocumentChangeAction[]): T[] {
        return actions.map((action: DocumentChangeAction) => {
            return this.defineModelId(action.payload.doc);
        });
    }

    private defineModelId(doc: DocumentSnapshot): T {
        if (!doc.exists) {
            return null;
        }

        return Models.DefineId<T>(doc.data(), doc.id);
    }

}
