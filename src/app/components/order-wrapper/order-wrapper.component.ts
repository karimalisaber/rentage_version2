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
  // constructor(private _lightbox: Lightbox) {
  //   for (let i = 1; i <= 4; i++) {
  //     const src = 'assets/images/' + i + '.jpg';
  //     // const caption = 'Image ' + i + ' caption here';
  //     const thumb = 'assets/images/' + i + '.jpg';
      
  //     const album = {
  //        src: src,
  //        caption: '',
  //        thumb: thumb
  //     };
 
  //     this._albums.push(album);
  //   }
  // }
 



 constructor(private api : ApiService, private router: Router , private assets: AssetsService, private snackBar: MatSnackBar, private _lightbox: Lightbox) { }

  ngOnInit(): void {
  }

  deletePost(id){
    this.api.deletePost(id).subscribe(
      res=>{

        location.reload();
        
        this.snackBar.open('تم الحذف', `` , {duration: 1500})

      }, () =>  this.snackBar.open('حدثت مشكلة بالاتصال بالسيرفر برجاء المحاولة مرة أخرى', `` , {duration: 1500})
    );
  }

  deleteAlert(id){
    this.assets.deleteAlert(id).subscribe(res=> res? this.deletePost(id): false );
  }


  acceptPost(id){
    this.api.acceptPost(id).subscribe(
      res=>{
        location.reload();
      }
    );    
  }

  open(post){
    let postsImgs =[];
    post.filter(res=> postsImgs.push({'src': this.url + res.name}))
    
    this._lightbox.open(postsImgs, 1);

    console.log(postsImgs);
    // console.log(post);
    
  }
}
