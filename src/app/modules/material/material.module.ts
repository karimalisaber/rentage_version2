import { DeleteDialogComponentComponent } from './../../components/assets/delete-dialog-component/delete-dialog-component.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditCatDialogComponent } from 'src/app/components/edit-cat-dialog/edit-cat-dialog.component';

const MaterialComponents =[
  MatDialogModule,
  MatMenuModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule
]

export const materialEntryComponents = [
  DeleteDialogComponentComponent,
  EditCatDialogComponent
];


@NgModule({
  declarations: [
  ],

  imports: [ MaterialComponents ],
  
  exports: [ 
    MaterialComponents,
  ],
})
export class MaterialModule { }
