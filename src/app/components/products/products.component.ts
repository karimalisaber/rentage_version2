import { async } from '@angular/core/testing';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnDestroy {
  isLoading: boolean = false;
  catId : string = "1";
  posts;
  currentCategory;
  subscription: Subscription;
  pages ={
    current_page : 1,
    lastPage: 1,
    pagesNumber : []
  }

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setCurrentPage(); // for query params | 1
    
    this.getPostsByCat();
  }

  
  private getPostsByCat(){
    this.subscription = this.route.paramMap
      .subscribe(
        res=>  {
          this.catId = res.get('cat_id')
          this.getSpecificCategories();
          this.getPosts();
        }
      );
  }

  getSpecificCategories(){
    this.api.getAllCategories().subscribe(res=>{
      this.currentCategory = res.filter(res=> res.id == this.catId);
      
      console.log(this.currentCategory);
      
    });
  }


  private setCurrentPage() {
    this.route.queryParamMap
      .subscribe(
        res =>  this.pages.current_page = parseInt(res.get('page')) || 1 
      );
  }


  filterPosts(value){
      if(value ==="all"){
        this.getPosts();
        return;
      }
    
      this.getPostsBySubCat(value);
  }


  
  private getPostsBySubCat(id){
    this.isLoading = true;
    this.api.getSubCatPosts(this.catId, this.pages.current_page)
    .subscribe(res=>{
      res.data.filter(res=> { // map result
        res.rate = Array(Math.round(res.rate)).fill('').map((res, i)=> res = i+1);
        res.emptyRate = Array( 5 - Math.round(res.rate)).fill('').map((res, i)=> res = i+1);
      });
  
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


  private getPosts(){
    this.isLoading = true;
    this.api.getCatPosts(this.catId, this.pages.current_page)
    .subscribe(res=>{
      res.data.filter(res=> { // map result
        res.rate = Array(Math.round(res.rate)).fill('').map((res, i)=> res = i+1);
        res.emptyRate = Array( 5 - Math.round(res.rate)).fill('').map((res, i)=> res = i+1);
      });

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


  search(word){
    this.pages.current_page = 1;
    this.isLoading = true;
    this.api.getPostsSearch(word, 'both',this.pages.current_page )
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

  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
