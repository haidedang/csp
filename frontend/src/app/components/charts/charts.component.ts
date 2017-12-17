import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseChartDirective} from "ng2-charts";
import {ChartTableComponent} from "../chart-table/chart-table.component";
import {ChartService} from "../../chart.service";
import {Http} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {DataTableDirective} from 'angular-datatables';

@ViewChild(BaseChartDirective)
// @ViewChild(DataTableDirective)

class Domain {
  _id: string;
  domain: string;
  "document-uri" :string;
  "blocked-uri":string;
  "violated-directive": string;
  "original-policy": string;
  date: string;
  __v: number;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

    dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  domains:Domain[]= [];
  dtTrigger: Subject<any> = new Subject();

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
  private table: ChartTableComponent;

  // events
  public chartClicked(e:any):void {
    ChartsComponent.clickedLabel= this.doughnutChartLabels[e.active["0"]._index];
    // this.http.get('http://localhost:4000/csp/youtube.com').subscribe(info => {
    //   console.log('request send');
    // });
    this.drawChart('http://localhost:4000/csp/'+ ChartsComponent.clickedLabel+'/month', function(){
      console.log('reached');
    });

     // this.table  = new ChartTableComponent(this.ht, this.chartService);
     // this.table.renderTable(ChartsComponent.clickedLabel);

    this.renderTable(ChartsComponent.clickedLabel);
    // table.renderTableSecond();

    // ChartTableComponent.test();

  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private http: HttpClient, private chartService:ChartService, private ht:Http) { }

  ngOnInit(): void {
    console.log('charts');
    this.drawChart('http://localhost:4000/csp/distinct', function(){
    });
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
    this.renderTable('')
  }

  public renderTable(domain:string):void{
      this.dtOptions = {
        retrieve:true,
        pagingType: 'full_numbers'
      };
      this.ht.get('http://localhost:4000/csp/'+domain)
        .subscribe(domains => {

          console.log(JSON.parse(domains["_body"]));
          this.domains = JSON.parse(domains["_body"]);

          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });


  }

  public drawChart(url:string, callback:any):void {
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
        console.log('first function');
        this.chartLoaded = true;
        callback();
      }
    )
  }

}
