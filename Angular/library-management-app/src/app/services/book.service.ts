import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BookService {

  private bookUrl: string = "http://localhost:3000/books";

  private token: string = JSON.parse(localStorage.getItem('adminData')).token;
  
  constructor(private http : HttpClient) { }

  public addBook(bookCatlog : BookModel) : Observable<any> {

    return this.http.post<any>(this.bookUrl, bookCatlog, { 
      headers: { 'Authorization': `Bearer ${this.token}` } 
    }).pipe(catchError(this.handleError));

  }

  public updateBook(id : number, user : BookModel) {
    
    return this.http.put<any>(`${this.bookUrl}/${id}`, user, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(catchError(this.handleError));
  }

  public getBooks() : Observable<any>{
    
    return this.http.get<any>(this.bookUrl, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }

  public getBook(id: number): Observable<any>{
    
    return this.http.get<any>(`${this.bookUrl}/${id}`, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }

  public removeBook(id : number) : Observable<any>{
    
    return this.http.delete<any>(`${this.bookUrl}/${id}`, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }

  private handleError(error : HttpErrorResponse) {
    return throwError('Something went wrong!');
  }
}
