import { Injectable } from '@angular/core';
import {ChartsComponent } from './components/charts/charts.component';

@Injectable()
export class ChartService {

  constructor() { }

  getLabel() : string {
    return  ChartsComponent.clickedLabel;
  }

}
