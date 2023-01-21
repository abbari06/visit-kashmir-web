import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path:'',redirectTo:'trip',pathMatch:'full'},{ path: 'trip', loadChildren: () => import('./domains/trip/trip.module').then(m => m.TripModule) }, { path: 'auth', loadChildren: () => import('./domains/auth/auth.module').then(m => m.AuthModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
