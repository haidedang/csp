import { Component, OnInit } from '@angular/core';
import {ChartService} from "../../chart.service";
import {joinTestLogs} from "protractor/built/util";

@Component({
  selector: 'app-chart-table',
  templateUrl: './chart-table.component.html',
  styleUrls: ['./chart-table.component.css']
})
export class ChartTableComponent implements OnInit {
  public   dtOptions;
  public   tableLoaded:boolean= false;
  public  domain:string;
  public label: string;

  constructor(private chartService: ChartService){
  };

  getLabel():string {
    return this.chartService.getLabel();

  }

  ngOnInit(): void {
    this.getLabel();
    this.renderTable();

  }

  public renderTable():void {
    console.log('render');

    // const foo = this.getLabel()
    const foo = this.getLabel();


   this.dtOptions = {
     "ajax": {
       "url": "http://localhost:4000/csp/"+ foo,
       "dataSrc": ""
     },
     "columns": [
       {
         "title": "domain",
         "data": "domain"
       },
       {
         "title": "document-uri",
         "data": "document-uri"
       },
       {
         "title": "blocked-uri",
         "data": "blocked-uri"
       },
       {
         "title": "violated-directive",
         "data": "violated-directive"
       },
       {
         "title": "original-policy",
         "data": "original-policy"
       },
       {
         "title": "date",
         "data": "date"
       }
     ],
     "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
     'autoWidth': false

   }
   console.log('bar', this.dtOptions)

   this.tableLoaded= true;
  }

}
