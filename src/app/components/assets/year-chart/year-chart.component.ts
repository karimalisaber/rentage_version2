import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Categories } from './../../../interfaces/categories';

@Component({
  selector: 'app-year-chart',
  templateUrl: './year-chart.component.html',
  styleUrls: ['./year-chart.component.scss']
})
export class YearChartComponent implements OnInit {
  options: Object;
  postsCategories = [];
  postsData:Array<number> = [];
  ordersCategories = [];
  ordersData:Array<number> = [];

  max;

  constructor(private api : ApiService) { 
   
  }




  ngOnInit(): void {

    this.getYearPosts()
  }

  getYearPosts(){
    this.api.getPostsYear()
    .subscribe(res=>{
      let keys = Object.keys(res)
      this.postsData  = Object.values(res).map((res:string)=> parseInt(res))

      this.max = Math.max.apply(null , this.postsData)

      console.log(this.max);
      
        

      this.postsCategories = keys.map(res=>{
        switch(res){
          case '01': res = 'يناير'; break;
          case '02': res = 'فبراير'; break;
          case '03': res = 'مارس'; break;
          case '04': res = 'إبريل'; break;
          case '05': res = 'مايو'; break;
          case '06': res = 'يونيو'; break;
          case '07': res = 'يوليو'; break;
          case '08': res = 'أغسطس'; break;
          case '09': res = 'سبتمبتر'; break;
          case '10': res = 'أكتوبر'; break;
          case '11': res = 'نوفمبر'; break;
          case '12': res = 'ديسمبر'; break;
        }

        return res
      });

     
      this.getYearOrders();
    })
  }


  
  getYearOrders(){
    this.api.getOrdersYear()
    .subscribe(res=>{
      let keys = Object.keys(res)
      this.ordersData = Object.values(res)

      this.ordersCategories = keys.map(res=>{
        switch(res){
          case '01': res = 'يناير'; break;
          case '02': res = 'فبراير'; break;
          case '03': res = 'مارس'; break;
          case '04': res = 'إبريل'; break;
          case '05': res = 'مايو'; break;
          case '06': res = 'يونيو'; break;
          case '07': res = 'يوليو'; break;
          case '08': res = 'أغسطس'; break;
          case '09': res = 'سبتمبتر'; break;
          case '10': res = 'أكتوبر'; break;
          case '11': res = 'نوفمبر'; break;
          case '12': res = 'ديسمبر'; break;
        }

        return res
      });

     
      let max = Math.max.apply(null , this.ordersData)

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
      categories: this.postsCategories
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
      reversed: false,
      squareSymbol: false,
      height: 150,
      itemMarginTop: 10,
      
      itemCheckboxStyle: {"width": "13px", "height": "313px", "position":"absolute"},
      // symbolHeight: 12,
      //   symbolWidth: 12,
      //   symbolRadius: 6,
      verticalAlign: "top",
      itemStyle: {"color": "#333333", "padding": "0 10px", "cursor": "pointer", "fontSize": "15px", "fontWeight": "bold", "textOverflow": "ellipsis"}
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
      plotLines: [{
        // value: 1,
        // width: 1,
        
        // color: '#808080'
      }]
    },

    series: [
      {
          name: 'الاعلانات',
          data: this.postsData, //come from api 
        }, 
        
        {
          name: 'الطلبات',
          data: this.ordersData, //come from api 
        }
      ]
    }
  }
}
