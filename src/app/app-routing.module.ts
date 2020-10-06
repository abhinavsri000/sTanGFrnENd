import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from "./_helpers/AuthGuard";
import { LandingPageComponent} from './landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent} from './auth/register/register.component';
import { HomeComponent } from './home/home /home.component';

const routes: Routes = [
  { path : '', redirectTo : 'home', pathMatch:'full'},
  { path : 'index', component: LandingPageComponent},
  { path : 'home', component: HomeComponent,  canActivate : [AuthGuard] },
  { path : 'login', component : LoginComponent,},
  { path : 'register', component : RegisterComponent},
  { path : '**' , component : PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
