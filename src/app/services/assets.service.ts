import { DeleteDialogComponentComponent } from './../components/assets/delete-dialog-component/delete-dialog-component.component';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {map, take} from "rxjs/operators"; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  constructor(private dialog: MatDialog, private snack: MatSnackBar) { }
  
  deleteAlert(id) {
    return  this.dialog.open(DeleteDialogComponentComponent,{
      panelClass: 'confirm-dialog-container',
      position: {top: '20px'}
    })
      .afterClosed().pipe(map(res=>{
        if(res === "yes") return true;
  
        return false;
      }),take(1));
  }

    deleteSuccess(){
      return this.snack.openFromComponent(SnackbarComponent,{duration: 2000, panelClass: 'background-none', horizontalPosition: 'right', verticalPosition: 'top'});
    }

    addSuccess(){
      return this.snack.openFromComponent(SnackbarComponent, {duration: 2000, panelClass: 'background-none', horizontalPosition: 'right', verticalPosition: 'top'});
    }

    errorMessage(){
      return this.snack.open("لم تتم العملية حاول مرة أخرى", `x` , {duration: 1500});
    }
 

    
}
