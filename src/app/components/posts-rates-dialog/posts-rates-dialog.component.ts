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
  total;

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
              
            });
            
            this.total = res.length
            this.rates = res
          }
        );
    }
  }
