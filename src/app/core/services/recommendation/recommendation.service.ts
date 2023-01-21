import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private http:HttpClient) { }

  getRecommendation(formData:any){
    return this.http.post(environment.baseUrl +'recommendation/onboarding', formData);
  }

  getDropDownData(){
    return this.http.get(environment.baseUrl +'place/name');
  }

  getRecommendationPlans(formData:any){
    return this.http.post(environment.baseUrl+'recommendation/onboarding2', formData);
  }
}
