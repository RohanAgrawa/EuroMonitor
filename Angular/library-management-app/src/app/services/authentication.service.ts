import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { UserResponseModel } from "../models/userResponse.model";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";

@Injectable()
export class AuthenticationService{

    private url : string = "http://localhost:3000";

    public user  : BehaviorSubject<UserResponseModel> = new BehaviorSubject<UserResponseModel>(null);
    private tokenExpirationTimer: any;

    constructor(private routes  : Router, private http : HttpClient) { }

  public signUp(userModel: UserModel): Observable<any> {
    
    return this.http.post<any>(`${this.url}/register`, userModel).pipe(catchError(this.handleError), tap((response) => {
      this.handleAuthentication(response);
    }));
  }
    
    public login(email_Id : string, password : string) : Observable<any>{

        const adminUser = {
            email: email_Id.toUpperCase(),
            password: password
        }

        return this.http.post<any>(`${this.url}/login`, adminUser).pipe(catchError(this.handleError), tap((response) => { 
            this.handleAuthentication(response);
          }));
    }

    public autoLogin(): void {
        const userData = JSON.parse(localStorage.getItem('adminData'));
        if (!userData) {
          return;
        }
    
        const loadedUser = new UserResponseModel(userData.id, userData.name, userData.phone_no, userData.email, userData.token, userData.role, new Date(userData.tokenExpirationDate));
    
        if (loadedUser) {
          this.user.next(loadedUser);
          const expirationDuration = loadedUser.tokenExpirationDate.getTime() - new Date().getTime();
          this.autoLogout(expirationDuration);
        }
      }
    
      public logout(): void {
        this.user.next(null);
        this.routes.navigate(['/authentication']);
        localStorage.removeItem('adminData');
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
    
  private handleAuthentication(response: any): void {
        const jwtToken = jwtDecode(response.accessToken);
          const expirationTime = jwtToken.exp * 1000;
          const userResponse = new UserResponseModel(response.user.id, response.user.name, response.user.phone_no, response.user.email, response.user.role, response.accessToken, new Date(expirationTime));
          this.user.next(userResponse);
          localStorage.setItem('adminData', JSON.stringify(userResponse));
          this.autoLogout(expirationTime - new Date().getTime());
      }
    
      private handleError(errorRes: HttpErrorResponse) {
        return throwError("Something went wrong!");
      }
}