import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AssetsService } from './../../services/assets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Lightbox } from 'ngx-lightbox';
import { MatDialog } from '@angular/material/dialog';
import { PostsRatesDialogComponent } from 'src/app/components/posts-rates-dialog/posts-rates-dialog.component';
@Component({
  selector: 'app-order-wrapper',
  templateUrl: './order-wrapper.component.html',
  styleUrls: ['./order-wrapper.component.scss']
})
export class OrderWrapperComponent implements OnInit {
  @Input('post') post;
  @Input('wattingOrders') wattingOrders;
  url = 'http://rentage.clicktopass.com/public/posts/'; 
  zIndexNone: boolean = false;



 constructor(private api : ApiService, private router: Router , private assets: AssetsService, private snackBar: MatSnackBar, private _lightbox: Lightbox, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  deletePost(id){
    this.api.deletePost(id).subscribe(
      res=>{
        this.assets.deleteSuccess().afterDismissed().subscribe(res=>{location.reload();});

      }, () =>  this.snackBar.open('حدثت مشكلة بالاتصال بالسيرفر برجاء المحاولة مرة أخرى', `` , {duration: 1500})
    );
  }

  deleteAlert(id){
    this.assets.deleteAlert(id).subscribe(res=> res? this.deletePost(id): false );
  }


  acceptPost(id){
    this.api.acceptPost(id).subscribe(
      res=>{
        this.assets.addSuccess().afterDismissed().subscribe(res=>{location.reload();});
      }
    );    
  }

  open(post){
    let postsImgs =[];
    post.filter(res=> postsImgs.push({'src': this.url + res.name}));
      
    this._lightbox.open(postsImgs, 0);
  }

  showRate(id){
    this.zIndexNone = true;    
    this.dialog.open(PostsRatesDialogComponent, {
      data: id,
      panelClass: 'rate-order-wrapper',
      width: '80%'
    }).afterClosed().subscribe(res=>{this.zIndexNone = false})
  }
}
