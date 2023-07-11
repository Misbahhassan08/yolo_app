import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ConfigrationComponent } from './configration/configration.component';
import { HistoryComponent } from './history/history.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    DashboardComponent,
    ConfigrationComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
     
     // MatSlideToggleModule
  ]
})
export class PagesModule { }
