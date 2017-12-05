import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
 dtOptions;
 cspAmount;
 domainAmount;

  constructor(private http:HttpClient){};

  ngOnInit(): void {
    this.dtOptions = {
      "ajax": {
        "url": "http://localhost:4000/csp",
        "dataSrc": ""
      },
      "columns": [
        { "data": "domain" },
        { "data": "document-uri" },
        { "data": "blocked-uri" },
        { "data": "violated-directive" },
        { "data": "original-policy"},
        { "data": "date" }
      ],
      "aLengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]],
      'autoWidth': false
    };

    this.http.get("http://localhost:4000/csp").subscribe(
      data => {
        this.cspAmount = Object.keys(data).length;
      }
    )

    this.http.get("http://localhost:4000/csp/distinct").subscribe(
      data => {
        this.domainAmount = Object.keys(data).length;
      }
    )

  }

}
