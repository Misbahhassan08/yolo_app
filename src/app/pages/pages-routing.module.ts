import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigrationComponent } from './configration/configration.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'dashboard', component:DashboardComponent},
  {path:'configure', component:ConfigrationComponent},
  {path:'history', component:HistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
