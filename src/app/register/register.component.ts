import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service"
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';  
  hide = true;
  ConfirmPasswordErrorMesssage = " ";

  username = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  /* password = new FormControl('',[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$')]) */
  password = new FormControl();
  toc = new FormControl('',[Validators.required,Validators.requiredTrue]);

  confirmpassword = new FormControl();
  registerForm = new FormGroup({});
  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService : AuthenticationService,
    ) {}

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
  onKeypressEvent(event: any){
    console.log(this.password.value);
    console.log(event.target.value);
    console.log(this.ConfirmPasswordErrorMesssage);

    if(event.target.value != this.password){
      this.ConfirmPasswordErrorMesssage = " Password Does Not Match";
    }
    else{
      this.ConfirmPasswordErrorMesssage = " ";
    }
  }
  onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
      console.log("InvalidForm");  
      return;
    } 
      this.loading = true;
      this.authenticationService.register(this.username.value,this.email.value,this.password.value,this.toc.value)
      .pipe(first())
      .subscribe( data => {
        this.router.navigate(['/home']);
      },error => {
        localStorage.setItem('email',this.email.value);
        localStorage.setItem('password',this.password.value);
        this.loading = false;
        this.error = error;
      });
    }

}