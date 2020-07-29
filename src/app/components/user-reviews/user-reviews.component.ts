import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRatesDialogComponent } from './../user-rates-dialog/user-rates-dialog.component';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent implements OnInit {
  rates;
  filteredRates;
  isLoading: boolean = false;
  total;
  average  =0;
  averageArray = [];
  emptyAverageArray = [];
  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getAllUsersRates()
      .subscribe(res=>{
        this.total = res.length;     
         
        res.filter(res=> { // map result
          res.rate = Array(Math.round(res.number)).fill('').map((res, i)=> res = i+1);
          res.emptyRate = Array( 5 - Math.round(res.number)).fill('').map((res, i)=> res = i+1);

          this.average = this.average + res.number

        });

        this.average = this.average / this.total;

          this.averageArray = Array(Math.round(this.average)).fill('').map((res, i)=> res = i+1);
          this.emptyAverageArray = Array( 5 - Math.round(this.average)).fill('').map((res, i)=> res = i+1);
        

        this.filteredRates = this.rates = res
       
      }
      ,()=>{}
      ,()=> this.isLoading = false
      )
  }

  
  search(value){
    this.filteredRates = (value)? this.rates.filter(res=> res.user_data.name.toLowerCase().includes(value.trim().toLowerCase())): this.rates;    
  }

  showRate(id){    
    this.dialog.open(UserRatesDialogComponent, {
      data: {
        id,
        averageArray: this.averageArray,
        emptyAverageArray: this.emptyAverageArray
      },
      panelClass: 'rate-order-wrapper',
      width: '80%'
    });
    }
}
