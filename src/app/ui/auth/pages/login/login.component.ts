import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  password = new FormControl('', Validators.required);
  postValue: { username: string; password: string/*; rememberme: boolean */};
  errorServerMessage:string;

  constructor(public router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  private serverUrl = 'http://localhost:49736';
  private registerUrl = '/api/account/login';

  onSubmitAPI(){
    this.postValue={username: this.email.value, password: this.password.value/*, rememberme: true*/};
    this.http.post(this.serverUrl+this.registerUrl, this.postValue)
    .subscribe((data:TokenMessage) => {
        console.log(data);
        localStorage.setItem('TeamSkillsToken', data.token);
        localStorage.setItem('TeamSkillsTokenExparation', data.exparation.toString());
        this.router.navigate(['/profile/user']);
      }, error => {this.password.setErrors({'incorrect': true});});
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(){
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.password.hasError('incorrect')) {
      return 'Invalid login and/or password';
    }
  }

}
export class ServerMessage{
  message: string;
}

export class TokenMessage{
  token: string;
  exparation: Date;
  username: string;
}