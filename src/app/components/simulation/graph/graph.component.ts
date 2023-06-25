import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges {
  
  
  @Input() chartData: { x: number, y: number }[];
  @Input() yAxisTitle: string;
  @Input() chartTitle: string;
  chartOptions : any;
  
  ngOnInit(): void {

    this.chartOptions = {
      title: {
        text: this.chartTitle
      },
      axisY: {
        title: this.yAxisTitle
      },
      data: [{
        type: 'line',
        dataPoints: this.chartData
      }]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && !changes['chartData'].firstChange) {
      this.chartOptions = {
        title: {
          text: this.chartTitle
        },
        axisY: {
          title: this.yAxisTitle
        },
        data: [{
          type: 'line',
          dataPoints: this.chartData
        }]
      };
    }
  }
}
