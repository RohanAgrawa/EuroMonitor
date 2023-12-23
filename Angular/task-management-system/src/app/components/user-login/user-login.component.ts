import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

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

  public async onLogin() : Promise<void>{
    
    const email : string = this.logInForn.value.email;
    const password: string = this.logInForn.value.password;
    
    await this.authenticateService.authenticateUser(email.toUpperCase(), password);
    
    this.authenticateService.user.subscribe((user) => {
      if (user) {
        this.isSubmitted = false;
        this.error = null;
        this.routes.navigate(['dash-board']);
      }
      else {
        this.isSubmitted = true;
        this.error = 'Invalid Credentials';
      }
      this.logInForn.resetForm();
    });
  }
}
