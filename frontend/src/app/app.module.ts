import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';

import { TableComponent } from './components/table/table.component';
import { ChartsComponent } from './components/charts/charts.component';

const appRoutes: Routes = [
  {path:'', component: TableComponent },
  {path:'table', component: TableComponent},
  {path: 'chart', component: ChartsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
