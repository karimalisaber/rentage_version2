import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  
  constructor(public snackBarRef: MatSnackBarRef<SnackbarComponent>) { 
    
  }

  ngOnInit(): void {
  }

}
