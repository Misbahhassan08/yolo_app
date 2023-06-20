import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { Camera1Component } from './camera1/camera1.component';


@NgModule({
  declarations: [
    Camera1Component
  ],
  imports: [
    CommonModule,
    CameraRoutingModule
  ]
})
export class CameraModule { }
