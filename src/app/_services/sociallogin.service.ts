import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
  url;
  constructor( private http : HttpClient) { }
  public savesresponse(response){
    this.url = 'http://localhost:8000/Api/Login/Savesresponse';
    return this.http.post(this.url,response);
  }
}
