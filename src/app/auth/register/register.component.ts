import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../_services/authentication.service"
import { first } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogActions } from "@angular/material/dialog";
import { MatDialogClose } from "@angular/material/dialog";
import { MatDialogContent} from '@angular/material/dialog';
import { MatDialogTitle} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  disabled = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';  
  hide = true;
  user_id = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  /* password = new FormControl('',[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$')]) */
  password = new FormControl();
  toc = new FormControl('',[Validators.required,Validators.requiredTrue]);
  confirmPassword = new FormControl('',[Validators.required]);
  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService : AuthenticationService,
    public dialog: MatDialog
    ) {
    }
    ngOnInit() {
      }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Enter valid Email' : '';
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
      if(this.toc.value == false){ 
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
          error => {
              this.error = "Provide Valid Credentials"; 
              this.loading = false;
          });
      },error => {
        this.loading = false;
        this.error = "Could not register . Please try again.";
      });
    }
    tnc() {
      this.dialog.open(tnc);
    }
}

@Component({
  selector: 'tnc',
  templateUrl: './tnc.html',
})
export class tnc {
  constructor(public dialog: MatDialog ){}
}