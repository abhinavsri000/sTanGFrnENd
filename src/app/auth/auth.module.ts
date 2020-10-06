import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from "./auth-routing.module";
import { MaterialModule} from '../material/material.module';
import { ReactiveFormsModule} from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider,  FacebookLoginProvider} from 'angularx-social-login';
import { fakeBackendProvider} from './../_helpers/fake-backend';
import { ErrorInterceptor } from './../_helpers/error.interceptor';
import { JwtInterceptor } from './../_helpers/jwt.interceptor';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers : [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '485744397747-i2rg2704h18ultr9gb4j0arqriprvoe3.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '1069515803463171'
              ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
  ]
})

export class AuthModule { }
