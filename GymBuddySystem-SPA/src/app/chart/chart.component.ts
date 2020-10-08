import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  config:zingchart.graphset = {
    type: 'line',
    series: [{
      values: [3,6,4,6,4,6,4,6]
    }],
  };

  constructor() { }

  ngOnInit(): void {
  }

}
