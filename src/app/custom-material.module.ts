import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
} from '@angular/material';

const Modules = [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
];

@NgModule({
    imports: [...Modules],
    exports: [...Modules],
})
export class CustomMaterialModule { }
