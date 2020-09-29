import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home /home.component';
import { AuthGuard } from "./_helpers/AuthGuard";

const routes: Routes = [
  { path : '' ,component : HomeComponent, canActivate: [AuthGuard]},
  { path :'home', component: HomeComponent,  canActivate : [AuthGuard] },
  { path : 'login', component : LoginComponent},
  { path : 'register', component : RegisterComponent},
  { path : '**' , component : PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
