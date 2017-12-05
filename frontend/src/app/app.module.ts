import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';

import { TableComponent } from './components/table/table.component';
import { ChartsComponent } from './components/charts/charts.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppsettingsComponent } from './components/appsettings/appsettings.component';

const appRoutes: Routes = [
  {path:'', component: TableComponent },
  {path:'table', component: TableComponent},
  {path: 'chart', component: ChartsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ChartsComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppsettingsComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ChartsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
