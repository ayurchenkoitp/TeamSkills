import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenMessage } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  postValue: { email: string; firstName: string; lastName: string; password: string;};
  formInvalide:boolean;
  errorServerMessage:string;

  constructor(public router: Router, private http: HttpClient) { }

  hide = true;
  
  email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{6,12}$")]);
  passwordConfirm = new FormControl('', Validators.required);

  ngOnInit(): void {
  }

  private serverUrl = 'http://localhost:49736';
  private registerUrl = '/api/account/register';


  onSubmitAPI(){
    // if (this.email.value==="" && this.firstName.value==="" && this.lastName.value==="" && this.lastName.value==="" && this.password.value==="" && this.passwordConfirm.value==="") {
    //   this.formInvalide=true;
    // }
    // if (this.email.value==="") {
    //   this.getEmailErrorMessage();
    //   return;
    // }
    this.errorServerMessage = null;
    this.postValue={email: this.email.value, firstName: this.firstName.value, lastName: this.lastName.value, password: this.password.value};
    this.http.post(this.serverUrl+this.registerUrl, this.postValue)
    .subscribe((data:TokenMessage) => {
      console.log(data);
      localStorage.setItem('TeamSkillsToken', data.token);
      localStorage.setItem('TeamSkillsTokenExparation', data.exparation.toString());
      this.router.navigate(['/profile/user']);
      },
      error=>{
        console.log(error); console.log(error.error.message); this.errorServerMessage=error.error.message;
      });
  }

  getPasswordErrorMessage(){
    if (this.password.hasError('minlength')) {
      return "Requared min length: "+this.password.errors.minlength.requiredLength+" Actual: " + this.password.errors.minlength.actualLength
    }
    return this.password.hasError('pattern') ? 'Password have to contains at least one upper case, one digit and one special character' : '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getPasswordConfirmErrorMessage(){
    if (this.passwordConfirm.value!=this.password.value) {
      return 'Password is not the same';
    }
  }

  isInvalidPass(){
    if (this.passwordConfirm.value!=this.password.value) {
      this.passwordConfirm.setErrors({'incorrect': true});
      return true;
    }
    return false;
  }
}

export class ServerMessage{
  message: string;
}
