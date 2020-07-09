import { DeleteDialogComponentComponent } from './../../components/assets/delete-dialog-component/delete-dialog-component.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditCatDialogComponent } from 'src/app/components/edit-cat-dialog/edit-cat-dialog.component';
import { SnackbarComponent } from './../../components/snackbar/snackbar.component';
import { AddSubCatComponent } from 'src/app/add-sub-cat/add-sub-cat.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const MaterialModules =[
  MatDialogModule,
  MatMenuModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatButtonToggleModule
]

export const materialEntryComponents = [
  DeleteDialogComponentComponent,
  EditCatDialogComponent,
  SnackbarComponent,
  AddSubCatComponent
];


@NgModule({
  declarations: [
  ],

  imports: [ MaterialModules ],

  exports: [ 
    MaterialModules,
  ],
})
export class MaterialModule { }
