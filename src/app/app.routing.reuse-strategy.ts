import { Inject } from '@angular/core';
import { Route, RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle, UrlSegment } from '@angular/router';

interface RouteStorageObject {
    handle: DetachedRouteHandle;
    snapshot: ActivatedRouteSnapshot;
}

export class CustomReuseStrategy implements RouteReuseStrategy {

    private positions: { [key: string]: number } = {};
    private storedRoutes: { [key: string]: RouteStorageObject } = {};

    constructor() { }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return !!route && !!route.data && !!(route.data as any).shouldDetach;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle) {
        const storePath = this.getUrlString(route);
        const storedRoute: RouteStorageObject = {
            handle: handle,
            snapshot: route,
        };

        this.storedRoutes[storePath] = storedRoute;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        this.refreshPagePosition(route);

        if (route.routeConfig && route.queryParams && route.queryParams.refresh) {
            return false;
        }

        const storePath = this.getUrlString(route);
        const canActivate: boolean = !!route.routeConfig
            && !!this.storedRoutes[storePath]
            && !!this.storedRoutes[storePath].handle
            ;

        return canActivate;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null;
        }

        const storePath = this.getUrlString(route);
        if (!this.storedRoutes[storePath]) {
            return null;
        }

        return this.storedRoutes[storePath].handle;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        if (!!future && !!future.data && !!future.data.shouldDetach) {
            this.cacheLatestPosition(future);
        }

        return future.routeConfig === curr.routeConfig;
    }

    private refreshPagePosition(route: ActivatedRouteSnapshot, positionY = 0) {
        let infiniteOverlay = document.querySelector('.virtual-scroll-overlay');
        if (infiniteOverlay) {
            infiniteOverlay.classList.add('virtual-scroll-overlay--active');
        }

        const isDetachComponent = this.isShouldDetachComponent(route.routeConfig);

        if (!isDetachComponent) {
            window.document.scrollingElement.scrollTop = 0;
            return;
        }

        const storePath = this.getUrlString(route);
        const id = setTimeout(() => {
            if (isDetachComponent && this.positions[storePath]) {
                positionY = this.positions[storePath];
            }

            window.document.scrollingElement.scrollTop = positionY;

            if (document.body.scrollHeight < positionY) {
                return this.refreshPagePosition(route, positionY);
            }

            infiniteOverlay = document.querySelector('.virtual-scroll-overlay');
            if (infiniteOverlay) {
                infiniteOverlay.classList.remove('virtual-scroll-overlay--active');
            }
        }, 10);
    }

    private cacheLatestPosition(route: ActivatedRouteSnapshot) {
        if (route) {
            const storePath = this.getUrlString(route);
            this.positions[storePath] = window.document.scrollingElement.scrollTop;
        }
    }

    private isShouldDetachComponent(routeConfig: Route): boolean {
        return !!routeConfig.data && !!routeConfig.data['shouldDetach'];
    }

    private getUrlString(snapshot: ActivatedRouteSnapshot) {
        return snapshot.url.map((v: UrlSegment) => v.path).join('/');
    }

}
