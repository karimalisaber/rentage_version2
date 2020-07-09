import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AssetsService } from 'src/app/services/assets.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-sub-cat',
  templateUrl: './add-sub-cat.component.html',
  styleUrls: ['./add-sub-cat.component.scss']
})
export class AddSubCatComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public category_id, private api: ApiService, private assets: AssetsService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  addSubCat(name){
    this.api.addSubCat( {category_id: this.category_id, name})
      .subscribe(
        res=> this.assets.addSuccess().afterDismissed().subscribe(res=>{location.reload();}),
        () =>  this.snackBar.open('حدثت مشكلة بالاتصال بالسيرفر برجاء المحاولة مرة أخرى', `` , {duration: 1500})
      );    
  }
}
