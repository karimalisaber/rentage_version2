import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-rates-dialog',
  templateUrl: './user-rates-dialog.component.html',
  styleUrls: ['./user-rates-dialog.component.scss']
})
export class UserRatesDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data, private api: ApiService) { }
rates;
total;
ngOnInit(): void {
    this.getSpecificUserRates();
  }

  getSpecificUserRates(){
    this.api.getSpecificUserRates(this.data.id)
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
