import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  username: string;
  token: string;
  postValue: { username: string; token: string};


  private subscription: Subscription;
  private querySubscription: Subscription;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { 
    this.subscription = route.params.subscribe(params=>{this.username=params['username'];});
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
          this.token = queryParam['token'];
      }
  );
  }

  ngOnInit(): void {
    this.getEmailConfirmed();
    setTimeout(() => {
      this.router.navigate(['/profile/user']);
    }, 2000);  //2s
  }

  private serverUrl = 'http://localhost:49736';
  private confirmEmailUrl = '/api/account/confirmemail';



  getEmailConfirmed(){
    this.postValue={username: this.username, token: this.token/*decodeURIComponent(this.token)*/};
    const url = this.serverUrl+this.confirmEmailUrl;
    console.log(this.username);
    console.log(this.token);
    console.log(decodeURIComponent(this.token));

    this.http.post(url/*+'?username='+this.username+'&token='+ this.token*/, this.postValue).subscribe((data) => {
      console.log(data);
    },
      error=>{
        console.log(error);
      }
    );
  }
}

export class ConfirmEmailPostMessage{
  username: string;
  token: string;
}
