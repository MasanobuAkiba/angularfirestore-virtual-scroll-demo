import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

// env
import { environment } from '../environments/environment';

// db
import { DbModule } from './db/db.module';

// ui
import { UiModule } from './ui/ui.module';

// routing
import { AppRoutes, PageComponents } from './app.routing';

// material
import { CustomMaterialModule } from 'app/custom-material.module';

// custom reuse strategy
import { CustomReuseStrategy } from './app.routing.reuse-strategy';

// angularfire
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// root component
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        ...PageComponents,
    ],
    imports: [
        DbModule,
        UiModule,
        BrowserModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes),

        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
