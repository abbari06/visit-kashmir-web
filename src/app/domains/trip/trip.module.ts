import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripComponent } from './trip.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    TripComponent,
    ItineraryComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    SharedModule
  ]
})
export class TripModule { }
