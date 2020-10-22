import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../_services/authentication.service"
import { first } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { SocialauthService } from '../../_services/socialauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  tncdisabled = true;
  btndisabled = true;
  loading = false;
  submitted = false;
  returnUrl : string;
  error = '';  
  hide = true;
  user_id  ;
  email  ; 
  /* password = new FormControl('',[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$')]) */
  password ;
  tnc ;
  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService : AuthenticationService,
    public dialog: MatDialog,
    private socialauthService : SocialauthService
    ) {
      this.registerForm = new FormGroup({
        user_id : new FormControl(''),
        email : new FormControl('', [Validators.email]),
        password : new FormControl(''),
        tnc : new FormControl({value: '', disabled: true},[Validators.required,Validators.requiredTrue]),
      });
    }
    ngOnInit() {
      this.email = this.registerForm.controls.email;
      this.password = this.registerForm.controls.password;
      this.user_id = this.registerForm.controls.user_id;
      this.tnc = this.registerForm.controls.tnc;
    }

  validate(){
    let user_id = this.user_id.value 
    let password = this.password.value
    let tnc = this.tnc.value
    this.tncdisabled = !(user_id && password && !this.registerForm.invalid)
    this.btndisabled = !(tnc && !this.tncdisabled)
  }

  getEmailErrorMessage() {
    return this.email.hasError('email') ? 'Enter valid email address' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('pattern') ? 'Password is Weak' : '';
  }
  getConfirmPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Password Does not match';
  }
  onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {  this.error = "Please check the credentials"; return;  } 
      if(this.tnc.value == false){ 
        this.error = "please Accept the terms and conditions"
        return; 
      }
      this.loading = true;
      this.authenticationService.register(this.user_id.value,this.email.value,this.password.value)
      .pipe(first())
      .subscribe( data => {
      this.authenticationService.login(this.email.value, this.password.value)
        .pipe(first())
        .subscribe(
          data => {
              this.router.navigate(['\home']);
          },
          error => {/* 
              this.error = "Provide Valid Credentials"; 
              this.loading = false; */
              
          });
      },error => {
        this.loading = false;
        this.error = "Could not register . Please try again.";
      });
    }
    t_nc() {
      this.dialog.open(tnc);
    }
    social_login(provider){
      this.socialauthService.authenticate(provider);
    }
}

@Component({
  selector: 'tnc',
  templateUrl: './tnc.html',
})
export class tnc {
  constructor(public dialog: MatDialog ){}
}