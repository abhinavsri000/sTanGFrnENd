import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home /home.component';
import { DashboardComponent}  from '../home/dashboard/dashboard.component';
import { ProfileComponent} from '../home/profile/profile.component';

const routes: Routes = [
    { path : 'home' , component : HomeComponent,
    children : [
        { path : '', redirectTo : 'profile', pathMatch: 'full' },
        { path : 'dashboard', component : DashboardComponent},
        { path : 'profile', component : ProfileComponent, pathMatch :'full' }]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
