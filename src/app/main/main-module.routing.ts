import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent}  from './dashboard/dashboard.component';
import { ProfileComponent} from './profile/profile.component';
import { HomeGuard} from  '../_helpers/HomeGuard';
const routes: Routes = [
    { path : 'home' , component : HomeComponent,canActivate: [HomeGuard] ,
    children : [
        { path : '', redirectTo : './profile', pathMatch: 'full' },
        { path : './dashboard', component : DashboardComponent},
        { path : './profile', component : ProfileComponent }],
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
