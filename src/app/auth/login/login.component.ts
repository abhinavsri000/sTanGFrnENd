import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AuthenticationService } from "../../_services/authentication.service"
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';  
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';  
import { Socialusers } from '../../_models/socialusers';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  response;  
  socialusers=new Socialusers();  
  hide = true;

  username = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  /* password = new FormControl('',[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$')]) */
  password = new FormControl();
  rememberPassword = new FormControl('');
  confirmpassword = new FormControl();
  loginForm = new FormGroup({});
  
  constructor( 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,  
) {
  // redirect to home if already logged in
  if (this.authenticationService.currentUserValue) { 
    this.router.navigate(['/home']);
}
 }
 ngOnInit() {

 }

 // convenience getter for easy access to form fields
 onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.loginForm.invalid) {
    console.log("");  
    return;
  }

  this.loading = true;
  this.authenticationService.login(this.email.value, this.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate(['\home']);
          },
          error => {
              this.error = "email or password is wrong "; 
              this.loading = false;
          });
}
socialSignIn(socialProvider: string) {  

  let socialPlatformProvider;  
  if (socialProvider === 'facebook') {  
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
  }
  else if (socialProvider === 'google') {  
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
  }  
  else if (socialProvider === 'linkedin') {  
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
  }
  /* this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
    localStorage.setItem('currentUser',JSON.stringify(socialusers))
    this.router.navigate(['/home'])  
    this.Savesresponse(this.socialusers);  
  }); */  
}  

Savesresponse(socialusers: Socialusers) {  /* 
  this.SocialloginService.savesresponse(socialusers).subscribe((res: any) => {  
    debugger;  
    console.log(res);  
    this.socialusers=res;  
    this.response = res.userDetail;  
    localStorage.setItem('socialusers', JSON.stringify( this.socialusers));  
    console.log(localStorage.setItem('socialusers', JSON.stringif y(this.socialusers)));  
    this.router.navigate([`/Dashboard`]);  
  })   */
  console.log(socialusers);
  this.router.navigate(['/Home']); 
}

getEmailErrorMessage() {
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }
  return this.email.hasError('email') ? 'Enter valid Email' : '';
}

}
