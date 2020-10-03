import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';  

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    register(username:string, email: string, password: string, toc : boolean){
        /* const password = CryptoJS.AES.encrypt(password.trim(), email.concat(username).trim().toString()); */
        return this.http.post<any>(`${environment.apiUrl}/users/add`, { username, email,password, toc });
    }

    login(email: string, password: string, rememberPassword: boolean) {
      /*   const encryptedPasscode = CryptoJS.AES.encrypt(password.trim(), email.trim().toString());
      */   
     const encryptedPasscode = password;
     if(rememberPassword==true){
            localStorage.setItem('user',encryptedPasscode);
        }
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { email, encryptedPasscode })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            },error=>{
                console.log("hello");
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}