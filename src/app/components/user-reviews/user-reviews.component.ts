import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent implements OnInit {
  type;
  product: boolean = false;

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getPageType();
  }

  getPageType(){
    this.route.paramMap
      .subscribe(
        res=>{
          this.type = res.get('type');
        }
      )
  }
}
