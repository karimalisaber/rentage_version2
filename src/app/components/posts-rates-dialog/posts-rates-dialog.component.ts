import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-posts-rates-dialog',
  templateUrl: './posts-rates-dialog.component.html',
  styleUrls: ['./posts-rates-dialog.component.scss']
})
export class PostsRatesDialogComponent implements OnInit {
  rates;
  total = 0;
  average;
  averageArray;
  emptyAverageArray;

  constructor(@Inject(MAT_DIALOG_DATA) public id, private api: ApiService) { }

  ngOnInit(): void {
      this.getSpecificUserRates();
    }
  
    getSpecificUserRates(){
      this.api.getPostRates(this.id)
        .subscribe(
          res=> {
            res.filter(res=> { // map result
              res.rate = Array(Math.round(res.number)).fill('').map((res, i)=> res = i+1);
              res.emptyRate = Array( 5 - Math.round(res.number)).fill('').map((res, i)=> res = i+1);
              this.average = this.average + res.number
              
            });
         
            this.total = res.length
               
            if(this.total !=0){
              this.average = this.average / this.total;

              this.averageArray = Array(Math.round(this.average)).fill('').map((res, i)=> res = i+1);
              this.emptyAverageArray = Array( 5 - Math.round(this.average)).fill('').map((res, i)=> res = i+1);

            }
      

            
          }
        );
    }
  }
