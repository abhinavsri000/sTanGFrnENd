import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../../_services/authentication.service';
import {Router } from '@angular/router';
import {User} from '../../_models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  currentUser: User;
  typesOfShoes = [
    {name : 'Dashboard',routerlink : './dashboard'},
    {name : 'Survey Tools',routerlink : './dashboard'},
    {name : 'Profile',routerlink : './profile'},
    {name : 'Analytics',routerlink : './dashboard'},
    {name : 'Settings',routerlink : './dashboard'},
    {name : 'Billing' ,routerlink : './dashboard'},
    {name : 'Privacy policy',routerlink : './dashboard'},
  ]
  opened ; 
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  toogleDrawer(){
    
  }
  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/index']);
  }

}
