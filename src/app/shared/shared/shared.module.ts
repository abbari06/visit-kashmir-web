import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../material/angular-material.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from '@angular/router';
import { Time24to12Format } from 'src/app/core/pipes/timeconvertion/time24to12.pipe';
import { LoaderComponent } from './loader/loader.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory(): any {  
  return import('lottie-web');
}


@NgModule({
  declarations: [
    NavbarComponent,
    Time24to12Format,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    LottieModule.forRoot({ player: playerFactory }),  

    

  ],
  exports:[
    AngularMaterialModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    Time24to12Format,
    LoaderComponent
  ]
})
export class SharedModule { }
