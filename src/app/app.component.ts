
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
import { Router } from '@angular/router';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  public p:String="";
  detail:String = 'User Not Found';

  constructor( private socialAuthService: AuthService, private router:Router, private http: Http  ) {}

  ngOnInit() {

      this.http
        .get("/assets/mockdata.json")
        .map(data => data.json())
        .subscribe(data => {
        this.p=data.Candidate[0].email;
          console.log(data.Candidate[0]);
        });
    }

  public signin(){
    this.router.navigate(['signin'])
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.http
        .get("/assets/mockdata.json")
        .map(data => data.json())
        .subscribe(data => {
        this.p=data.Candidate[0].responseError[0].errorMessage;
          console.log(data.Candidate[0].responseError[0].errorMessage);
          alert("Error Code : " + data.Candidate[0].responseError[0].errorCode);
          alert("Error Message : " + data.Candidate[0].responseError[0].errorMessage);
        });
        //using API
        //Passing email data to backend API
        //let mockdata= JSON File
        //navigate
        this.router.navigate(['signin']);



      }
    );
  }

  title='app';
}
