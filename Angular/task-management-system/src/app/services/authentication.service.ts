import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { UserResponseModel } from '../models/user-response.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string = 'http://localhost:3000/login';

  public user  : BehaviorSubject<UserResponseModel> = new BehaviorSubject<UserResponseModel>(null);
  private tokenExpirationTimer: any;

  constructor(private routes  : Router, private http : HttpClient) { }

  public authenticateUser(email_Id: string, password: string) {

    const userDetail = {
      email: email_Id,
      password: password
    };
    
    return this.http.post<any>(this.url, userDetail).pipe(catchError(this.handleError), tap((response) => { 
      this.handleAuthentication(response);
    }));
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

  private handleAuthentication(response : any): void {
    const jwtToken = jwtDecode(response.accessToken);
      const expirationTime = jwtToken.exp * 1000;
      const userResponse = new UserResponseModel(response.user.id, response.user.name, response.user.email, response.accessToken, new Date(expirationTime));
      this.user.next(userResponse);
      localStorage.setItem('userData', JSON.stringify(userResponse));
      this.autoLogout(expirationTime - new Date().getTime());
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError("Something went wrong!");
  }
}
