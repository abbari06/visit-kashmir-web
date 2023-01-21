import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecommendationService } from 'src/app/core/services/recommendation/recommendation.service';
 interface Recommendation {
  [key: string]: [day];
}
interface day{
  [key:string]:{
    attractions:[attraction],
    foodplaces:any[],
    events:any[],
    recreationalActivities:any[]
  }
}
interface attraction{
  name:string;
  description:string;
  images?:[string];
  videos?:[string];
  category?:[string];
  placeId:number;
  knownFor?:[string];
  extraInfo?:[];
  restroomAvailability?:boolean;
  bestTimeToVisit?:[string];
  modeOfBooking?:[string];
  thingsToDo?:[string];
  rating?:number;
  startSlot?:string;
  endSlot?:string
}


@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss'],
})
export class ItineraryComponent implements OnInit {
  formData: any;
  Object = Object;
  showMore: any[] = [];
  dropDownData:any=[];
  data:any;
  totalDays: any;
  arrivalTime:any='10:05';
  departureTime:any='16:00';
  hotelCheckInTime:any='11:05';
  loader=true;
  constructor(
    private route: ActivatedRoute,
    private service: RecommendationService

  ) {
    this.getDropDownData();
    this.route.queryParams.subscribe({
      next: (value: any) => {
        this.formData = JSON.parse(value.form);
        if (value.booked == 'false') {
          this.getPlanRecommendation();

        } else {
          this.getRecommendation();

        }
      },
    });
    var time_difference =
      new Date(this.formData.query.departureDate).getTime() -
      new Date(this.formData.query.arrivalDate).getTime();
    this.totalDays = time_difference / (1000 * 60 * 60 * 24) + 1;
   
  }
  ngOnInit(): void {}

  getDropDownData(){
    this.service.getDropDownData().subscribe({
      next:(res:any)=>{
        this.dropDownData = res.data
      },
      error:(err)=>{}
    })
  }
  getRecommendation() {
    for(let itinerary of this.formData.itineraryForm){
      if(itinerary.day==1){
        this.arrivalTime= itinerary.arrivalTime;
        var demoDate = new Date("1990-01-01 "+this.arrivalTime);
        demoDate.setHours(demoDate.getHours() + 1);
        this.hotelCheckInTime = (demoDate.getHours()+":"+demoDate.getMinutes()).toString();
        console.log(this.hotelCheckInTime);
        
      }
      else if(itinerary.day==this.totalDays){
        this.departureTime = itinerary.departureTime
      }
    }
    this.service.getRecommendation(this.formData).subscribe({
      next: (res: any) => {
        this.data = res.data;
        for(let key in this.data){  
          for(let day of this.data[key]){
            for(let keys in day){
              for(let place of this.dropDownData){
                if(place._id==keys){
                  day[place.name]=day[keys];
                  delete day[keys];
                }
              }
            }
          }
        }   
      this.loader=false;
      },
      error: (err: any) => {},
    });
  }

  getPlanRecommendation() {
   
    this.service.getRecommendationPlans(this.formData).subscribe({
      next: (res: any) => {
        this.data = res.data;
        for(let key in this.data){  
          for(let day of this.data[key]){
            for(let keys in day){
              for(let place of this.dropDownData){
                if(place._id==keys){
                  day[place.name]=day[keys];
                  delete day[keys];
                }
              }
            }
          }
        }
        this.loader=false;
      },
      error: (err: any) => {},
    });
  }

  changeAction(i: any) {
    console.log(i);
    this.showMore[i] = !this.showMore[i];
  }
 recommendation(o:Recommendation){
  for(let keys in o){
    // console.log(keys)
  }
    return o;
  }
}
