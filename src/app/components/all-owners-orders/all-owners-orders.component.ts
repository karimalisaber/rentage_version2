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

type = 'all';

  constructor(private route: ActivatedRoute, private api: ApiService, private assets: AssetsService, private snackBar: MatSnackBar, private _lightbox: Lightbox , private router: Router) { }

  ngOnInit(): void {
    this.getOwnerData();
    this.getQueryParam();
  }


  private getQueryParam(){
    this.route.queryParamMap.subscribe(
      res=>{
        this.type = res.get('type') || 'all';

        this.filterPosts(this.type);        
      }
    )
  }


  private getOwnerData(){
    this.userName = this.route.snapshot.paramMap.get('name');
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  private getAllPostsForOwners(){ // all posts
    this.router.navigate(
      [], 
      {
        queryParams:{'type': 'all'}, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    this.type = 'all';
    this.isLoading = true;
    this.api.getAllPostsForOwner(this.userId)
      .subscribe(
        res=> {
          this.mapAllOrders(res.data)
        },
      ()=>{},
      ()=> this.isLoading = false
      );
  }


  mapAllOrders(res){    
    res.forEach(element => {
      element.post_data_dashboard = {}
    
      element.post_data_dashboard.id = element.id
      element.post_data_dashboard.category_id = element.category_id
      element.post_data_dashboard.sub_category_id = element.sub_category_id
      element.post_data_dashboard.name = element.name
      element.post_data_dashboard.price = element.price
      element.post_data_dashboard.des = element.des
      element.post_data_dashboard.count = element.count
      element.post_data_dashboard.status = element.status
      element.post_data_dashboard.start_date = element.start_date
      element.post_data_dashboard.end_date = element.end_date
      element.post_data_dashboard.delivery = element.delivery
      element.post_data_dashboard.city = element.city
      element.post_data_dashboard.insurance_amount = element.insurance_amount
      element.post_data_dashboard.rent = element.rent
      element.post_data_dashboard.map = element.map
      element.post_data_dashboard.post_status = element.post_status
      element.post_data_dashboard.user_id = element.user_id
      element.post_data_dashboard.post_imgs = element.post_imgs
      
    });

    this.posts = res
  }

  private getAcceptedPostsForOwners(){ // all orders
    this.type = 'owner';

    
    this.router.navigate(
      [], 
      {
        queryParams:{'type': 'owner'}, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    this.isLoading = true;
    this.api.getAcceptedPostsForOwner(this.userId)
      .subscribe(
        res=> {
          this.posts = res.reverse()
        },
      ()=>{},
      ()=> this.isLoading = false
      );
  }

  
  private getAllPostsForClient(){
    this.type ='client';

    
    this.router.navigate(
      [], 
      {
        queryParams:{'type': 'client'}, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    this.isLoading = true;
    this.api.getAllPostsForClients(this.userId)
      .subscribe(
        res=> {
          this.posts = res;
        },
      ()=>{},
      ()=> this.isLoading = false
      );
    }

  filterPosts(type?){

    this.type = type || this.type;

    if(this.type==="all"){
      this.getAllPostsForOwners();
      return
    }
    
    if(this.type==="owner"){
      this.getAcceptedPostsForOwners();
      return
    }

    if(this.type==='client'){
      this.getAllPostsForClient();
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

  showRate(t){

  }
}
