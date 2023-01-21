import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { TripComponent } from './trip.component';

const routes: Routes = [{ path: '', component: TripComponent ,children:[
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'itinery', component:ItineraryComponent},
  {path:'home', component:HomeComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
