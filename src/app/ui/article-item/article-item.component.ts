import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import * as Models from 'app/models';

@Component({
    selector: 'app-article-item',
    templateUrl: './article-item.component.html',
    styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {

    @Input() index: number;
    @Input() article: Models.Article;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    toDetail() {
        this.router.navigate(['article', this.article.id]);
    }

}
