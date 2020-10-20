import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  private serverUrl = 'http://localhost:49736';
  private restorePassUrl = '/api/account/restorepass';

  constructor(public router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getRestorePassword(){
    console.log(this.email.value);

    this.http.get(this.serverUrl+this.restorePassUrl+'?emailtorestore='+this.email.value).subscribe((data) => {
      console.log(data);
    },
      error=>{
        console.log(error);
      }
    );
  }

}
