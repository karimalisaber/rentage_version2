import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Categories } from './../../../interfaces/categories';

@Component({
  selector: 'app-month-chart',
  templateUrl: './month-chart.component.html',
  styleUrls: ['./month-chart.component.scss']
})
export class MonthChartComponent implements OnInit {
  options: Object;
  date = new Date();

  postsCategories = [];
  postsData:Array<any> = [];
  ordersCategories = [];
  ordersData:Array<any> = [];

  max;



  constructor(private api: ApiService) { 
   
  }

  ngOnInit(): void {
  this.getMonthPosts();

  }

  
  getMonthPosts(){
    this.api.getPostsMonth()
    .subscribe(res=>{
      
      let keys = Object.keys(res);
      let values = Object.values(res);
      
      keys.forEach((element,i) => {
        
        this.postsData.push([parseInt(element) , values[i]])
        
      });
      


      this.max = Math.max.apply(null , values)
     
 
      
      this.getMonthOrders();
    })
  }


  
  getMonthOrders(){
    this.api.getOrdersMonth()
    .subscribe(res=>{
      let keys = Object.keys(res);
      let values = Object.values(res);
      
      keys.forEach((element,i) => {
        
        this.ordersData.push([parseInt(element) , values[i]])
        
      });
      
      let max = Math.max.apply(null , values)

      this.max = Math.max(max , this.max)

      
      this.setCart();
    })
  }


  setCart(){
    this.options = {
      credits:{
        enabled: false
      },

      title : { text : '' },
      chart: { 
        zoomType: 'x',
        // backgroundColor: '#f8f8f8' 
      },

      xAxis: {
        title: {
          text: '', 
        },
  
        reversed: true,
        tickInterval: null,
        
        // categories:  this.ordersCategories

      },


  
      tooltip:{
        style:{
          color: '#000',
          borderRadius: '20px'
        },
        formatter: function() {
          return  this.y;
        }
    },
      
    legend: {
      align: 'left',
      alignColumns: false,
      rtl: true,
      borderWidth: 1,
      borderRadius: 5,
      // itemWidth: 10,
      layout: "vertical",
      // reversed: false,
      squareSymbol: false,
      height: 150,
      itemMarginTop: 10,      
      verticalAlign: "top",
      itemStyle: {"fontSize": "15px"}
    },
    
    yAxis: {
      title: {
        text: '',
      },
      min: 0,
      max: this.max + (this.max/10),
      // tickInterval: 20,
      gridLineWidth: false, // disable grid lines
      
      opposite: true,
      
    },

    series: [
      {
          name: 'الاعلانات',
          data: this.postsData, //come from api 


        }, 
        
        {
          name: 'الطلبات',
          data:this.ordersData, //come from api
         
          // data: this.postsData //come from api 
        }
      ]
    }
  }






  private getMonthArray(){
    let data = [];
    for(let i = 1; i < (this.lastday()+1) ; i++){
      data.push(i)
    }

    data = ['يناير', 'فبراير', 'مارس' , 'أبريل' , 'مايو' , 'يونيو' , 'يوليو' , 'أغسطس' , 'سبتمبر' , 'أكتوبر' , 'نوفمبر', 'ديسمبر']
    return data;    
  }

  private lastday (){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()	+ 1;
    return  new Date(year, month, 0).getDate();
  }

}
