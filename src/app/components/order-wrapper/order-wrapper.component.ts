import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AssetsService } from './../../services/assets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Lightbox } from 'ngx-lightbox';
@Component({
  selector: 'app-order-wrapper',
  templateUrl: './order-wrapper.component.html',
  styleUrls: ['./order-wrapper.component.scss']
})
export class OrderWrapperComponent implements OnInit {
  @Input('post') post;
  @Input('wattingOrders') wattingOrders;
  url = 'http://rentage.clicktopass.com/public/posts/';  
 



 constructor(private api : ApiService, private router: Router , private assets: AssetsService, private snackBar: MatSnackBar, private _lightbox: Lightbox) { }

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
      // console.log(postsImgs);
      
    this._lightbox.open(postsImgs, 0);
  }
}
