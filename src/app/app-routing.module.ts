import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from "./_helpers/AuthGuard";
import { LandingPageComponent} from './landing-page/landing-page.component';
import { PreloadAllModules } from '@angular/router';
const routes: Routes = [
  { path : '', component: LandingPageComponent, canActivate : [AuthGuard]},
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
   { path : '**' , component : PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
