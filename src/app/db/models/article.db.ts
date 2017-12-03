import { Injectable } from '@angular/core';

import { DbAbstract } from '../dbAbstract';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

import * as Models from 'app/models';

@Injectable()
export class ArticleDb extends DbAbstract<Models.Article> {

    protected readonly CollectionPath = 'article';

    constructor(
        protected db: AngularFirestore,
    ) {
        super(db);
    }

}
