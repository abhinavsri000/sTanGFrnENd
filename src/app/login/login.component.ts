import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../_services/authentication.service"
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';  
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';  
import { Socialusers } from '../_models/socialusers';  
import { SocialloginService } from '../_services/sociallogin.service';  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  response;  
  socialusers=new Socialusers();  

  constructor( 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public OAuth: SocialAuthService,
    private SocialloginService: SocialloginService,  
) {
  // redirect to home if already logged in
  if (this.authenticationService.currentUserValue) { 
    this.router.navigate(['/home']);
}
 }
 ngOnInit() {
  this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

 // convenience getter for easy access to form fields
 get f() { return this.loginForm.controls; }
 onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
    console.log("InvalidForm");  
    return;
  }

  this.loading = true;
  this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate(['\home']);
          },
          error => {
              this.error = error;
              this.loading = false;
          });
}
socialSignIn(socialProvider: string) {  

  let socialPlatformProvider;  
  console.log("hello");
  if (socialProvider === 'facebook') {  
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
  }
  else if (socialProvider === 'google') {  
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
  }  
  this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
    console.log(socialProvider, this.socialusers);  
    console.log(this.socialusers);  /* 
    this.Savesresponse(this.socialusers);  */ 
  });  
  
}  
Savesresponse(socialusers: Socialusers) {  /* 
  this.SocialloginService.savesresponse(socialusers).subscribe((res: any) => {  
    debugger;  
    console.log(res);  
    this.socialusers=res;  
    this.response = res.userDetail;  
    localStorage.setItem('socialusers', JSON.stringify( this.socialusers));  
    console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));  
    this.router.navigate([`/Dashboard`]);  
  })   */
  console.log(socialusers);
  this.router.navigate(['/Home']); 
}
}
