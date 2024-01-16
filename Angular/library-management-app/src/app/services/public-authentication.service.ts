import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";


@Injectable()

export class publicAuthenticationService{
    
    private url: string = "http://localhost:3000";
    public publicUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    
    constructor(private http: HttpClient, private routes : Router) { }

    public logIn(email: string, password: number) : Observable<any>{
        email = email.toUpperCase();
        return this.http.get<any>(`${this.url}/publicUsers?email=${email}&phone_no=${password}`).pipe(
            catchError(this.handleError), tap((response) => {
                this.handleAuthentication(response)
            }));
    }

    public autoLogin(): void {
        const userData = JSON.parse(localStorage.getItem('publicData'));
        
        if (!userData) {
          return;
        }
        if (userData) {
          this.publicUser.next(userData[0]);
        }
    }

    public logout(): void {
        this.publicUser.next(null);
        this.routes.navigate(['/publicAuthentication']);
        localStorage.removeItem('publicData');
    }

  private handleAuthentication(response: any): void {
    if (response.length > 0) {
      this.publicUser.next({ ...response });
      localStorage.setItem('publicData', JSON.stringify(response));
    }
  }
    
      private handleError(errorRes: HttpErrorResponse) {
        return throwError("Something went wrong!");
      }
}