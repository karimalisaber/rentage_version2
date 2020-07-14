import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { AssetsService } from 'src/app/services/assets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-all-owners-orders',
  templateUrl: './all-owners-orders.component.html',
  styleUrls: ['./all-owners-orders.component.scss']
})
export class AllOwnersOrdersComponent implements OnInit {
userName;
userId;
posts;
isLoading: boolean = false;
url = 'http://rentage.clicktopass.com/public/posts/';

  constructor(private route: ActivatedRoute, private api: ApiService, private assets: AssetsService, private snackBar: MatSnackBar, private _lightbox: Lightbox) { }

  ngOnInit(): void {
    this.getOwnerData();
 
    this.getAllPostsForOwners();
  }

  private getOwnerData(){
    this.userName = this.route.snapshot.paramMap.get('name');
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  private getAllPostsForOwners(){
    this.isLoading = true;
    this.api.getAllPostsForOwner(this.userId)
      .subscribe(
        res=> this.posts = res,
      ()=>{},
      ()=> this.isLoading = false
      );
  }

  private getAcceptedPostsForOwners(){
    this.isLoading = true;
    this.api.getAcceptedPostsForOwner(this.userId)
      .subscribe(
        res=> this.posts = res,
      ()=>{},
      ()=> this.isLoading = false
      );
  }

  filterPosts(type){
    if(type==="all"){
      this.getAllPostsForOwners();
      return
    }
    
    if(type==="accepted"){
      this.getAcceptedPostsForOwners();
      return
    }
  }

  deleteAlert(id){
    this.assets.deleteAlert(id).subscribe(res=> res? this.deletePost(id): false );
  }

  deletePost(id){
    this.api.deletePost(id).subscribe(
      res=>{
        this.assets.deleteSuccess().afterDismissed().subscribe(res=>{location.reload();});

      }, () =>  this.snackBar.open('حدثت مشكلة بالاتصال بالسيرفر برجاء المحاولة مرة أخرى', `` , {duration: 1500})
    );
  }

  
  open(post){
    let postsImgs =[];
    post.filter(res=> postsImgs.push({'src': this.url + res.name}));
      
    this._lightbox.open(postsImgs, 0);
  }

}
