import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-wrapper',
  templateUrl: './order-wrapper.component.html',
  styleUrls: ['./order-wrapper.component.scss']
})
export class OrderWrapperComponent implements OnInit {
  @Input('post') post;


  constructor(private api : ApiService) { }

  ngOnInit(): void {
   
  }


  deletePost(id){
    // return element.findIndex( (item: any) =>{ return item.id === id });

    // let itemIndex = this.post.findIndex(item => item.id === id);

    // console.log(id);

    
    

    // let itemIndex = this.assets.findIndex(this.categories, id); //findindex
    // var deletedItem = this.post.splice(itemIndex, 1);

    this.api.deletePost(id).subscribe(
      res=>{
        
      }
    )
  }

}
