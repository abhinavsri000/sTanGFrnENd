import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home /home.component';
import { AuthGuard } from "./_helpers/AuthGuard";
import { LandingPageComponent} from './landing-page/landing-page.component';
import { ProfileComponent} from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path : '', component: LandingPageComponent },
  { path :'home', component: HomeComponent,/* ,  canActivate : [AuthGuard]  */    
    children : [
      { path : '', redirectTo : 'profile', pathMatch: 'full' },
      { path : 'dashboard', component : DashboardComponent},
      { path : 'profile', component : ProfileComponent, pathMatch :'full' }]   
  },
  { path : 'login', component : LoginComponent},
  { path : 'register', component : RegisterComponent},
  { path : '**' , component : PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
