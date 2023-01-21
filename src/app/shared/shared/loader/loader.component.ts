import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
 

})
export class LoaderComponent implements OnInit {
  options: AnimationOptions = {    
    path: '../../../../assets/118515-travel-loading.json'  
  }; 
  constructor() { }

  ngOnInit(): void {
  }
  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }
}
