import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { UserResponseModel } from '../../models/user-response.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  @ViewChild('f') public logInForn : NgForm;
  public isSubmitted: boolean = false;  
  public error : string = null;
  constructor(private authenticateService : AuthenticationService, private routes : Router){}

  public onLogin(): void {
    
    let authObs: Observable<UserResponseModel>;

    authObs = this.authenticateService.authenticateUser(this.logInForn.value.email.toUpperCase(), this.logInForn.value.password);

    authObs.subscribe((response) => {
      this.isSubmitted = false;
      this.error = null;
      this.routes.navigate(['dash-board']);
    }, (error) => {
      this.isSubmitted = true;
      this.error = 'Invalid Credentials'; 
    });
    this.logInForn.resetForm();
  }
}
