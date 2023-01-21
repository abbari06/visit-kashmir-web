import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopThreeService {

  constructor(private http:HttpClient) { }
body={
  sort:{
    rating:-1
  },
  limit:3
}
  topThree(endpoint:string,){
    return this.http.post(environment.baseUrl + endpoint, this.body );
  }
}
