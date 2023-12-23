import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserResponseModel } from '../models/user-response.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string = 'http://localhost:3000/login';

  public user  : BehaviorSubject<UserResponseModel> = new BehaviorSubject<UserResponseModel>(null);
  private tokenExpirationTimer: any;

  constructor(private routes  : Router) { }

  public async authenticateUser(email_Id: string, password: string): Promise<void> {

    const userDetail = {
      email: email_Id,
      password: password
    }
    const response = fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetail)
    });
    
    response.then((res) => {
      if (res.ok) {
        const userResp = res.json();
        userResp.then((resp) => {
          const jwtToken = jwtDecode(resp.accessToken);
          const expirationTime = jwtToken.exp * 1000;
          const userResponse = new UserResponseModel(resp.user.id, resp.user.name, resp.user.email, resp.accessToken, new Date(expirationTime));
          this.user.next(userResponse);
          localStorage.setItem('userData', JSON.stringify(userResponse));
          this.autoLogout(expirationTime - new Date().getTime());
        })
      }
    });

  }

  public autoLogin(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new UserResponseModel(userData.id, userData.name, userData.email, userData.token, new Date(userData.tokenExpirationDate));

    if (loadedUser) {
      this.user.next(loadedUser);
      const expirationDuration = loadedUser.tokenExpirationDate.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  public logout(): void {
    this.user.next(null);
    this.routes.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

}