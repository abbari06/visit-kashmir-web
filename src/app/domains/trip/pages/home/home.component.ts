import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { RecommendationService } from 'src/app/core/services/recommendation/recommendation.service';
import { TopThreeService } from 'src/app/core/services/top-three/top-three.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  showForm = false;
  form!: FormGroup;
  totalKids: number = 0;
  totalAdults: number = 0;
  totalTeens: number = 0;
  categoriesList: any = [];
  userInterests!: [];
  dropDownData:any=[];
  threePlaces:any=[];
  threeAttractions:any=[];
  threeEvents:any=[];
  threeFoodPlaces:any=[];
  threeActivities:any=[];
  loader=true;
  bookNowForm!:FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private service: RecommendationService,
    private router: Router,
    private topThreeService:TopThreeService
  ) {}
  ngOnInit() {


    this.form = this._formBuilder.group({
      itineraryForm: this._formBuilder.array([]),
      query: this._formBuilder.group({
        arrivalDate: ['', [Validators.required]],
        departureDate: ['', [Validators.required]],
        interests: [],
        totalAdults: [],
        totalKids: [],
        totalTeens: [],
      }),
    });

    this.bookNowForm = this._formBuilder.group({
      query:this._formBuilder.group({
        arrivalDate: ['', [Validators.required]],
        departureDate: ['', [Validators.required]],
        interests: [],
        totalAdults: [],
        totalKids: [],
        totalTeens: [],
      })
    })
    this.getCategories();
    this.getDropDownData();
    this.topThreePlaces();
    this.topThreeAttractions();
    this.topThreeFoodPlaces();
    this.topThreeActivites();
    this.topThreeEvents();
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  get itineraryForm() {
    return this.form?.get('itineraryForm') as FormArray;
  }

  getCategories() {
    this.categoryService.get().subscribe({
      next: (res: any) => {
        this.categoriesList = res;
      },
      error: (err) => {},
    });
  }

  getDropDownData(){
    this.service.getDropDownData().subscribe({
      next:(res:any)=>{
        this.dropDownData = res.data
      },
      error:(err)=>{}
    })
  }
  kidsInc() {
    this.totalKids++;
    this.form.get('query')?.get('totalKids')?.setValue(this.totalKids);
    this.bookNowForm.get('query')?.get('totalKids')?.setValue(this.totalKids);
  }

  kidsDec() {
    if (this.totalKids == 0) {
      this.totalKids = 0;
      this.form.get('query')?.get('totalKids')?.setValue(this.totalKids);
      this.bookNowForm.get('query')?.get('totalKids')?.setValue(this.totalKids);
    } else {
      this.totalKids--;
      this.form.get('query')?.get('totalKids')?.setValue(this.totalKids);
      this.bookNowForm.get('query')?.get('totalKids')?.setValue(this.totalKids);
    }
  }
  adultsInc() {
    this.totalAdults++;
    this.form.get('query')?.get('totalAdults')?.setValue(this.totalAdults);
    this.bookNowForm.get('query')?.get('totalAdults')?.setValue(this.totalAdults);
  }

  adultsDec() {
    if (this.totalAdults == 0) {
      this.totalAdults = 0;
      this.form.get('query')?.get('totalAdults')?.setValue(this.totalAdults);
      this.bookNowForm.get('query')?.get('totalAdults')?.setValue(this.totalAdults);
    } else {
      this.totalAdults--;
      this.form.get('query')?.get('totalAdults')?.setValue(this.totalAdults);
      this.bookNowForm.get('query')?.get('totalAdults')?.setValue(this.totalAdults);
    }
  }
  teensInc() {
    this.totalTeens++;
    this.form.get('query')?.get('totalTeens')?.setValue(this.totalTeens);
    this.bookNowForm.get('query')?.get('totalTeens')?.setValue(this.totalTeens);
  }

  teensDec() {
    if (this.totalTeens == 0) {
      this.totalTeens = 0;
      this.form.get('query')?.get('totalTeens')?.setValue(this.totalTeens);
      this.bookNowForm.get('query')?.get('totalTeens')?.setValue(this.totalTeens);
    } else {
      this.totalTeens--;
      this.form.get('query')?.get('totalTeens')?.setValue(this.totalTeens);
      this.bookNowForm.get('query')?.get('totalTeens')?.setValue(this.totalTeens);
    }
  }
  check() {
    var time_difference =
      this.form.get('query')?.get('departureDate')?.value.getTime() -
      this.form.get('query')?.get('arrivalDate')?.value.getTime();
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    if (days_difference > 0) {
      for (let i = 0; i <= days_difference; i++) {
        if (i == 0) {
          this.itineraryForm.push(
            this._formBuilder.group({
              day:[i+1],
              trigger: ['arrival'],
              action: ['',[Validators.required]],
              arrivalTime: ['', [Validators.required]],
              stay: [false],
            })
          );
        } else if (i == days_difference) {
          this.itineraryForm.push(
            this._formBuilder.group({
              day:[i+1],
              trigger: ['departure'],
              action: ['',[Validators.required]],
              departureTime: ['',[Validators.required]],
              stay: [false],
            })
          );
        } else {
          this.itineraryForm.push(
            this._formBuilder.group({
              day:[i+1],
              trigger: ['visit'],
              action: ['',[Validators.required]],
              stay: [false],
            })
          );
        }
      }
    }
    this.showForm = true;
  }
  myFunc() {
    let arr = [];
    let checkboxes: any = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    for (let i = 0; i < checkboxes.length; i++) {
      arr.push(checkboxes[i].value);
    }
    this.form.get('query')?.get('interests')?.setValue(arr);
    this.bookNowForm.get('query')?.get('interests')?.setValue(arr);
  }

  getItinerary() {
    this.router.navigate(['/trip/itinery'], {queryParams:{form:JSON.stringify(this.form.value)}, preserveFragment:true})
  }

  getNewItinery(){
    this.router.navigate(['/trip/itinery'], {queryParams:{form:JSON.stringify(this.bookNowForm.value),booked:false}, preserveFragment:true})
  }

  topThreePlaces(){
    this.topThreeService.topThree('place/list').subscribe({
      next:(res:any)=>{
        this.loader = false;
        this.threePlaces = res.data;
      },
      error:(err:any)=>{}
    })
  }

  topThreeAttractions(){
    this.topThreeService.topThree('attraction/list').subscribe({
      next:(res:any)=>{
        this.threeAttractions = res.data;
      },
      error:(err:any)=>{}
    })
  }
  topThreeFoodPlaces(){
    this.topThreeService.topThree('foodplace/list').subscribe({
      next:(res:any)=>{
        this.loader = false;
        this.threeFoodPlaces = res.data;
      },
      error:(err:any)=>{}
    })
  }
  topThreeActivites(){
    this.topThreeService.topThree('recreational-activity/list').subscribe({
      next:(res:any)=>{
        this.loader = false;
        this.threeActivities = res.data;
      },
      error:(err:any)=>{}
    })
  }
  topThreeEvents(){
    this.topThreeService.topThree('event/list').subscribe({
      next:(res:any)=>{
        this.loader = false;
        this.threeEvents = res.data;
      },
      error:(err:any)=>{
        // this.loader=false;
      }
    })
  }

}
