import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import * as DB from 'app/db';
import * as Models from 'app/models';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

    article$: Observable<Models.Article>;

    constructor(
        private route: ActivatedRoute,
        private articleDb: DB.ArticleDb,
    ) { }

    ngOnInit() {
        this.article$ = this.articleDb.findByKey(this.route.snapshot.params.articleId);
    }

}
