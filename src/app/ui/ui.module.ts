import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { CustomMaterialModule } from 'app/custom-material.module';

import { SpinnerComponent } from './spinner/spinner.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';

const AppUiComponents = [
    SpinnerComponent,
    ArticleItemComponent,
    VirtualScrollComponent,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        VirtualScrollModule,
        CustomMaterialModule,
    ],
    declarations: [
        ...AppUiComponents,
    ],
    exports: [
        ...AppUiComponents,
    ],
})
export class UiModule { }
