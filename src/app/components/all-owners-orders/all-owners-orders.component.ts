import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';

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

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.getOwnerData();
    this.getPostsData();
  }

  private getOwnerData(){
    this.userName = this.route.snapshot.paramMap.get('name');
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  private getPostsData(){
    this.isLoading = true;
    this.api.getAllPostsForOwner(this.userId)
      .subscribe(
        res=> this.posts = res
        // res=> console.log(res)
        
      ),
      ()=>{},
      ()=> this.isLoading = false
  }
}
