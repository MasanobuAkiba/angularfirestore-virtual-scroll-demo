import { Component, ContentChild, TemplateRef, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { scan, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DbAbstract } from 'app/db/dbAbstract';
import { ChangeEvent } from 'angular2-virtual-scroll';
import { MaximumTimestamp } from 'app/models/firebase.model';

import * as DB from 'app/db';

export interface FetchEvent {
    last: Date;
    limit: number;
}

export type orderByDateFieldName = 'createdAt' | 'updatedAt';

@Component({
    selector: 'app-virtual-scroll',
    templateUrl: './virtual-scroll.component.html',
    styleUrls: ['./virtual-scroll.component.scss'],
})
export class VirtualScrollComponent implements OnInit {

    @Input() limit = 20;
    @Input() itemNotify: Subject<any[]>;
    @Input() childHeight = 112;
    @Input() orderByDateFieldName: orderByDateFieldName = 'createdAt';
    @Output() fetch = new EventEmitter();
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

    items$: Observable<any[]>;
    loadingNotify = new BehaviorSubject<boolean>(false);

    private endDate = new Date(0);
    private lastNotify: BehaviorSubject<Date>;
    private itemLength: number;

    constructor() { }

    ngOnInit() {
        this.initialize();
    }

    fetchMore(event: ChangeEvent) {
        if (event.end === this.itemLength) {
            this.fetchNextChunk();
        }
    }

    initialize() {
        this.lastNotify = new BehaviorSubject<Date>(new Date(MaximumTimestamp));

        this.items$ = this.itemNotify.pipe(
            scan((current: any[], future: any[]) => {
                if (future.length > this.limit) {
                    future.pop();
                    const nextDate = future[future.length - 1][this.orderByDateFieldName];
                    this.lastNotify.next(nextDate);
                } else {
                    this.lastNotify.next(this.endDate);
                }

                return current.concat(future);
            }, []),
            tap((items: any[]) => this.itemLength = items.length),
            tap(() => this.loadingNotify.next(false)),
        );

        this.fetchNextChunk();
    }

    private fetchNextChunk() {
        const last = this.lastNotify.getValue();

        if (last <= this.endDate) {
            return;
        }

        this.loadingNotify.next(true);

        const eventParam: FetchEvent = { last, limit: this.limit + 1 };
        this.fetch.emit(eventParam);
    }

}
