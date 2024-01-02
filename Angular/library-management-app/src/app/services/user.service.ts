import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class UserService{

  private userUrl: string = "http://localhost:3000/publicUsers";

  private token: string = localStorage.getItem("adminData") === null? "Fake" : JSON.parse(localStorage.getItem('adminData')).token;  
  
  constructor(private http: HttpClient) {

  }

  public addUser(user : UserModel) : Observable<any> {

    return this.http.post<any>(this.userUrl, user, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }


  public handleError(error : HttpErrorResponse) {
    return throwError('Something went wrong!');
  }

  public getUsers() : Observable<any>{
    
    return this.http.get<any>(this.userUrl, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }

  public getUser(id: number) : Observable<any>{
    return this.http.get<any>(`${this.userUrl}/${id}`, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }


  public updateUser(id : number, user : UserModel) : Observable<any>{
    return this.http.put<any>(`${this.userUrl}/${id}`, user, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(catchError(this.handleError));
  }


  public deleteUser(id : number) {
    
    return this.http.delete<any>(`${this.userUrl}/${id}`, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }
}
