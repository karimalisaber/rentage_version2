import { DeleteDialogComponentComponent } from './../../components/assets/delete-dialog-component/delete-dialog-component.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MaterialComponents =[
  MatDialogModule,
  MatMenuModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
]

export const materialEntryComponents = [
  DeleteDialogComponentComponent
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
