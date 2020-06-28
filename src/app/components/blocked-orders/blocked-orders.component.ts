import { Component, OnInit } from '@angular/core';
import { ViewProductDialogComponent } from '../view-product-dialog/view-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blocked-orders',
  templateUrl: './blocked-orders.component.html',
  styleUrls: ['./blocked-orders.component.scss']
})
export class BlockedOrdersComponent implements OnInit {
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
      )
  }

  private getPosts(){
    this.isLoading = true;
    this.api.getNewPosts(this.pages.current_page)
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
}
