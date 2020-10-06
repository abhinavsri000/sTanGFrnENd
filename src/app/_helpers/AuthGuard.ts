import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.currentUserSubject.value;
        if (currentUser) {
            this.router.navigate(['/home']);
            return false;
        }
        // not logged in so redirect to login page with the return url
        //  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return true;
    }
}
