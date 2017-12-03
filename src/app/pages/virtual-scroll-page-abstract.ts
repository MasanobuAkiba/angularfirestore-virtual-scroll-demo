import { OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { VirtualScrollComponent, FetchEvent } from 'app/ui/virtual-scroll/virtual-scroll.component';
import { publishReplay, refCount } from 'rxjs/operators';

export abstract class VirtualScrollPageAbstract<T> implements OnDestroy {

    @ViewChild('virtualScroll') virtualScroll: VirtualScrollComponent;

    protected subscriptions = new Subscription;

    private scrollPosition = 0;

    itemNotify = new Subject<T[]>();

    constructor() { }

    protected abstract fetchItems(event: FetchEvent): Observable<T[]>;

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    onFetch(event: FetchEvent) {
        this.subscriptions.add(this.fetchItems(event)
            .subscribe((items: T[]) => {
                this.itemNotify.next(items);
            })
        );
    }

    protected refreshList() {
        this.virtualScroll.initialize();
    }

}
