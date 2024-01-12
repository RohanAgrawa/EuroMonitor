import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { UserResponseModel } from "../models/userResponse.model";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";

@Injectable()
export class AuthenticationService{

    private url : string = "http://localhost:3000";

    public user  : BehaviorSubject<UserResponseModel> = new BehaviorSubject<UserResponseModel>(null);

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
        }
      }
    
      public logout(): void {
        this.user.next(null);
        this.routes.navigate(['/authentication']);
        localStorage.removeItem('adminData');
      }
    
   
    
  private handleAuthentication(response: any): void {
        
          const userResponse = new UserResponseModel(response.user.id, response.user.name, response.user.phone_no, response.user.email, response.user.role, response.accessToken);
          this.user.next(userResponse);
          localStorage.setItem('adminData', JSON.stringify(userResponse));
      }
    
      private handleError(errorRes: HttpErrorResponse) {
        return throwError("Something went wrong!");
      }
}