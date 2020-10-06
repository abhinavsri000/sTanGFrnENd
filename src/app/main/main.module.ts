import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { MainRoutingModule } from './main-module.routing';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
  ]
})

export class MainModule { }
