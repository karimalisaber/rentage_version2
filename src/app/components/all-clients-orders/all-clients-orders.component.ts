import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AssetsService } from './../../services/assets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-all-clients-orders',
  templateUrl: './all-clients-orders.component.html',
  styleUrls: ['./all-clients-orders.component.scss']
})
export class AllClientsOrdersComponent implements OnInit {
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
      this.api.getAllPostsForClients(this.userId)
        .subscribe(
          res=> {
            this.posts = res;
            console.log(res);
            
          },
        ()=>{},
        ()=> this.isLoading = false
        );
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
