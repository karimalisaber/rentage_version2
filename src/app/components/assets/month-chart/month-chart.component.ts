import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month-chart',
  templateUrl: './month-chart.component.html',
  styleUrls: ['./month-chart.component.scss']
})
export class MonthChartComponent implements OnInit {
  options: Object;
  date = new Date();


  constructor() { 
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
        categories: this.getMonthArray()
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
      verticalAlign: "top",
      itemStyle: {"fontSize": "15px"}
    },
    
    yAxis: {
      title: {
        text: '',
      },
      min: 0,
      max: 100,
      tickInterval: 20,
      gridLineWidth: false, // disable grid lines
      
      opposite: true,
      plotLines: [{
        value: 1,
        width: 1,
        
        color: '#808080'
      }]
    },

    series: [
      {
          name: 'الاعلانات',
          data: [50.7, 8.8, 122.4, 55.2, 40, 27, 90], //come from api 
        }, 
        
        {
          name: 'الطلبات',
          data: [20.7, 88.8, 22.4, 15.2, 50,17,20], //come from api 
        },

        {
          name: 'أداء الشهر',
          data: [0.7, 8.8, 42.4, 35.2, 40, 27, 40], //come from api 
        }

      ]
    }
  }

  ngOnInit(): void {
  }

  private getMonthArray(){
    let data = [];
    for(let i = 1; i < (this.lastday()+1) ; i++){
      data.push(i)
    }

    return data;    
  }

  private lastday (){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()	+ 1;
    return  new Date(year, month, 0).getDate();
  }

}
