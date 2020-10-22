import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SocialauthService {
  authenticate(provider : string ){
    if (provider == 'Google'){
    }
    else if (provider == 'LinkedIn'){}
    else if (provider == 'twitter'){}
    else if ( provider == 'facebook'){
    }
  }  
  
  constructor() { }
}
