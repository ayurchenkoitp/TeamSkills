import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  currentUser: CurrentUser;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() formUserList: FormBuilder;

  postValue: { FirstName: string; LastName: string};

  imageUrl = "https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png"
  constructor(public router: Router, private http: HttpClient, public dialog: MatDialog) { }

  currentUser: CurrentUser;
  changeFirstName = false;
  changeLastName = false;

  ngOnInit(): void {
    this.getUserData();
  }

  private serverUrl = 'http://localhost:49736';
  private userDatasUrl = '/api/account/userprofile';
  errorServerMessage: string;

  getUserData(){
    const token = localStorage.getItem('TeamSkillsToken');
    console.log(token);
    this.http.get(this.serverUrl+this.userDatasUrl, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }}).subscribe((data:CurrentUser) => {
      console.log(data);
      this.currentUser=data;
    },
      error=>{
        console.log(error);
        this.router.navigate(['/auth/login']);
      }
    );
  }

  chooseImage(){

  }

  saveProfileChanges(){
    this.postValue = {FirstName: this.currentUser.firstName, LastName: this.currentUser.lastName}
    const token = localStorage.getItem('TeamSkillsToken');
    console.log(token);
    this.http.post(this.serverUrl+"/api/account/updateProfile", this.postValue, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }}).subscribe((data:CurrentUser) => {
      console.log(data);
    },
      error=>{
        console.log(error); this.errorServerMessage=error.error.message;
      }
    );
  }

  private EmailConfirmationUrl = '/api/account/sendemailconfirmation';

  sendEmailConfirmation(){
    const token = localStorage.getItem('TeamSkillsToken');
    console.log(token);
    this.http.get(this.serverUrl+this.EmailConfirmationUrl, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }}).subscribe((data:CurrentUser) => {
      console.log(data);
    },
      error=>{
        console.log(error); this.errorServerMessage=error.error.message;
      }
    );

    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserProfileComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser.emailConfirmed=true;
    });
  }

  logout(){
    localStorage.removeItem('TeamSkillsToken');
    this.router.navigate(['/auth/login']);
  }
}


export class CurrentUser{
  email: string;
  emailConfirmed: boolean;
  firstName: string;
  lastName: string;
}



@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile.component-dialog.html',
})
export class UserProfileComponentDialog {



}