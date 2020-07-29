import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  options: Object;


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
      categories: ['السبت', 'الأحد' , 'الاثنين', 'الثلاثاء' , 'الأربعاء' , 'الخميس', 'الجمعة']
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
        }
      ]
    }
  }

  ngOnInit(): void {
  }

}
