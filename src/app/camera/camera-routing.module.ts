import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Camera1Component } from './camera1/camera1.component';

const routes: Routes = [

{
  path:'camera' , component:Camera1Component
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule {}
