import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path: 'login',
  loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
},
{
  path:'',
  loadChildren:()=> import('./pages/pages.module').then(m=>m.PagesModule)
},

{
  path:'',
  loadChildren:()=> import('./camera/camera.module').then(m=>m.CameraModule)
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
