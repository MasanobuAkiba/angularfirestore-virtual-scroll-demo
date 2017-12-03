import { Component, OnInit, OnDestroy } from '@angular/core';

import { delay, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { FetchEvent } from 'app/ui/virtual-scroll/virtual-scroll.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSlideToggleChange } from '@angular/material';
import { VirtualScrollPageAbstract } from 'app/pages/virtual-scroll-page-abstract';

import * as DB from 'app/db';
import * as Models from 'app/models';

type SortFieldName = 'likeCount' | 'createdAt';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent extends VirtualScrollPageAbstract<Models.Article> {

    articles$: Observable<Models.Article[]>;

    private isEmptyMode = false;

    constructor(
        private articleDB: DB.ArticleDb,
    ) {
        super();
    }

    onChange(event: MatSlideToggleChange) {
        this.isEmptyMode = event.checked;
        super.refreshList();
    }

    fetchItems(event: FetchEvent): Observable<Models.Article[]> {
        if (this.isEmptyMode) {
            return Observable.of([]).pipe(delay(300), take(1));
        }

        return this.articleDB.findList(ref => {
            return ref
                .orderBy('createdAt', 'desc')
                .startAfter(event.last)
                .limit(event.limit);
        }).pipe(take(1));
    }

}
