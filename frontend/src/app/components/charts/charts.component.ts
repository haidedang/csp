import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseChartDirective} from "ng2-charts";

@ViewChild(BaseChartDirective)

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  result = [];
// Doughnut
  public chartLoaded:boolean = false;
  public doughnutChartLabels:string[]=[];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  public dataset =[];
  public labels=[];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.drawChart('http://localhost:4000/csp/distinct')
  }

  public drawChart(url:string):void {
    console.log(url);
    this.doughnutChartData =[];
    this.doughnutChartLabels= [];
    this.chartLoaded = false;

    this.http.get(url).subscribe(
      info => {
        for (let i = 0; i < Object.keys(info).length; i++) {
          if (Object.keys(info[i]).length===0 ) {
              continue;
          }
          else {

            this.doughnutChartData.push(info[i].amount);
            this.doughnutChartLabels.push(info[i].item);
          }
        }
        console.log(this.doughnutChartData);
        this.chartLoaded = true;
      }
    )
  }

}
