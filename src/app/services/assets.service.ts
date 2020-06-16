import { DeleteDialogComponentComponent } from './../components/assets/delete-dialog-component/delete-dialog-component.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {map, take} from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  constructor(private dialog: MatDialog) { }
  
  deleteAlert(id) {
    return  this.dialog.open(DeleteDialogComponentComponent)
      .afterClosed().pipe(map(res=>{
        if(res === "yes") return true;
  
        return false;
      }),take(1));
    }  
}
