import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseChartDirective} from "ng2-charts";
import {ChartTableComponent} from "../chart-table/chart-table.component";
import {ChartService} from "../../chart.service";

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
  public domain:any[]=[];
  public static clickedLabel:string="";

  public dataset =[];
  public labels=[];

  // events
  public chartClicked(e:any):void {
    ChartsComponent.clickedLabel= this.doughnutChartLabels[e.active["0"]._index];
    this.drawChart('http://localhost:4000/csp/'+ ChartsComponent.clickedLabel+'/month');
     let table = new ChartTableComponent(this.chartService);
     table.ngOnInit();

  }


  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private http: HttpClient, private chartService:ChartService) { }

  ngOnInit(): void {
    console.log('charts');
    this.drawChart('http://localhost:4000/csp/distinct');
    this.http.get('http://localhost:4000/csp/distinct').subscribe(
      info => {
          console.log(info);
        let temp =  Object.keys(info).map(key => info[key]);
          temp.forEach( item => {
            this.domain.push(
              {"domain": item["item"],
               "query": 'http://localhost:4000/csp/'+ item["item"]+'/month'
            });
          })
        console.log(this.domain);
      }
    )
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
