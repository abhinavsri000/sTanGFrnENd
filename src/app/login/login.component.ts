import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../_services/authentication.service"
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
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

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) {
  // redirect to home if already logged in
  if (this.authenticationService.currentUserValue) { 
    this.router.navigate(['/home']);
}
 }
 ngOnInit() {
  this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
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
  this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              console.log("p");
              this.router.navigate([this.returnUrl]);
          },
          error => {
            console.log("error");
              this.error = error;
              this.loading = false;
          });
}

}
