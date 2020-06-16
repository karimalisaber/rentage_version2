import { map } from 'rxjs/operators';
import { getSpecificPostesUrl } from './../../../assets/environment/environmentVariables';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-product-dialog',
  templateUrl: './view-product-dialog.component.html',
  styleUrls: ['./view-product-dialog.component.scss']
})
export class ViewProductDialogComponent implements OnInit {
post ;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
      private http: HttpClient
    ) { }

  ngOnInit(): void {
    console.log(this.data.id);
    
    this.http.get(getSpecificPostesUrl + this.data.id).pipe(map((res:any) => res.data))
    .subscribe(res=>{
      this.post = res
    })
    
  }

}
