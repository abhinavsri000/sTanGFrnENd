import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service"
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService : AuthenticationService,
    ) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });}

    onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
      console.log("InvalidForm");  
      return;
    } 
    this.loading= true;
    this.authenticationService.register(this.f.username.value,this.f.password.value)
      .pipe(first())
      .subscribe( data => {
        console.log("user registered Successlfy");
        this.router.navigate([this.returnUrl]);
        this.loading=false;
      },error => {
        console.log("user not registerd");
        this.loading=false;
      });
  }
    get f() { return this.registerForm.controls; }

}