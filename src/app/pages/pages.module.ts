import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { StaffComponent } from './staff/staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    StaffComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
