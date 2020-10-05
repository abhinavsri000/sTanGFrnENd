import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
  url;
  twitterUrl='https://api.twtter.com/oauth';
  oauth_token;
  constructor( private http : HttpClient) { }
  /* public savesresponse(response){
    this.url = 'http://localhost:8000/Api/Login/Savesresponse';
    return this.http.post(this.url,response);
  }
  twitterLogin(oauth_nonce:String,oauth_callback:String,oauth_signature_method:String,oauth_timestamp:String,oauth_consumerKey:String,oauth_signature:String,oauth_version="1.0"){
    this.oauth_token = this.http.post<any>(`${this.twitterUrl}/request_token`,{ oauth_nonce,oauth_callback,oauth_signature_method,oauth_timestamp,oauth_consumerKey,oauth_signature,oauth_version });
    this.twitterUrl = 'https://api.twitter.com/oauth/authenticate?oauth_token=Z6eEdO8MOmk394WozF5oKyuAv855l4Mlqo7hhlSLik' 
  };
 */

}
