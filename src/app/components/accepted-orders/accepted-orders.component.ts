import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.scss']
})
export class AcceptedOrdersComponent implements OnInit {
  isLoading: boolean = false;

  posts;
  pages ={
    current_page : 1,
    lastPage: 1,
    pagesNumber : []
  }

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setCurrentPage(); // for query params | 1
    
    this.getPosts();
  }

  
  private setCurrentPage() {
    this.route.queryParamMap
      .subscribe(
        res =>  this.pages.current_page = parseInt(res.get('page')) || 1 
      );
  }



  private getPosts(){
    this.isLoading = true;
    this.api.getAcceptedPosts(this.pages.current_page)
    .subscribe(res=>{
      res.data.filter(res=> { // map result
        res.rate = Array(Math.round(res.rate)).fill('').map((res, i)=> res = i+1);
        res.emptyRate = Array( 5 - Math.round(res.rate)).fill('').map((res, i)=> res = i+1);
      });
    
      this.posts = res.data.reverse();
      this.pages.current_page = res.current_page;
      this.pages.lastPage = res.last_page;
      this.pages.pagesNumber = Array(this.pages.lastPage);
      window.scroll(0,0);
  }
  ,()=>{},

   ()=>{this.isLoading = false}

  );
  }


  otherPosts(pageNumber){
    if(pageNumber !== this.pages.current_page){
      this.pages.current_page = pageNumber;
      
      this.router.navigate([], {
        queryParams: {'page': this.pages.current_page},
     });

      this.getPosts();
    }
  }
  

  nextPosts(){
    if (this.pages.current_page < this.pages.lastPage){
      this.pages.current_page ++;
      
      this.router.navigate([], {
        queryParams: {'page': this.pages.current_page},
     });

      this.getPosts();
    }    
  }


  prevPosts(){
    if (this.pages.current_page > 1){
      this.pages.current_page --;
      
      this.router.navigate([], {
        queryParams: {'page': this.pages.current_page},
     });

      this.getPosts();
    }  
  }

  
  search(word){
    this.pages.current_page = 1;
    this.isLoading = true;
    this.api.getPostsSearch(word, 'new',this.pages.current_page )
    .subscribe(res=>{
      this.posts = res.data;
      this.pages.current_page = res.current_page;
      this.pages.lastPage = res.last_page;
      this.pages.pagesNumber = Array(this.pages.lastPage);
      window.scroll(0,0);    
    }
    ,()=>{},

    ()=>{this.isLoading = false}
    );
  }
  
}
