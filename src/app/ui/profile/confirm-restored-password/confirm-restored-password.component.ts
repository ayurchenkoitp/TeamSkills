import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-restored-password',
  templateUrl: './confirm-restored-password.component.html',
  styleUrls: ['./confirm-restored-password.component.scss']
})
export class ConfirmRestoredPasswordComponent implements OnInit {
  username: string;
  token: string;
  hide = true;
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{6,12}$")]);
  passwordConfirm = new FormControl('', Validators.required);
  errorServerMessage: string;

  private subscription: Subscription;
  private querySubscription: Subscription;
  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.subscription = route.params.subscribe(params=>{this.username=params['username'];});
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
          this.token = queryParam['token'];
      }
  );
  }

  ngOnInit(): void {
  }

  getPasswordErrorMessage(){
    if (this.password.hasError('minlength')) {
      return "Requared min length: "+this.password.errors.minlength.requiredLength+" Actual: " + this.password.errors.minlength.actualLength
    }
    return this.password.hasError('pattern') ? 'Password have to contains at least one upper case, one digit and one special character' : '';
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

  private serverUrl = 'http://localhost:49736';
  private restorePassUrl = '/api/account/restorepassconfirm';

  submitNewPassword(){
    console.log(this.password.value);

    this.http.post(this.serverUrl+this.restorePassUrl, {username: this.username, token: this.token, newPassword: this.password.value}).subscribe((data) => {
      console.log(data);
    },
      error=>{
        console.log(error); this.errorServerMessage=error.error.message;
      }
    );
  }

}
