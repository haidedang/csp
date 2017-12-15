import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chart-table',
  templateUrl: './chart-table.component.html',
  styleUrls: ['./chart-table.component.css']
})
export class ChartTableComponent implements OnInit {
  public   dtOptions;
  public   tableLoaded:boolean= false;
  public  domain:string;

  constructor(){

  };

  ngOnInit(): void {

    this.renderTable("youtube.com");

  }

  public renderTable(domain:string):void {
    this.domain = domain;
    console.log('render');
   this.dtOptions = {
     "ajax": {
       "url": "http://localhost:4000/csp/"+domain,
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

   this.tableLoaded= true;
  }

}
