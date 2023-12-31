import { Injectable } from '@angular/core';
import { BookTransactionModel } from '../models/book-transaction.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class BookTransactionService {

  private borrowedBookUrl: string = "http://localhost:3000/borrow";
  private token: string = localStorage.getItem("adminData") === null? "Fake" : JSON.parse(localStorage.getItem('adminData')).token;

  constructor(private http : HttpClient) { }


  public borrowBook(borrowedBook : BookTransactionModel) : Observable<any> {

    return this.http.post<any>(this.borrowedBookUrl, borrowedBook, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(catchError(this.handleError));
  }

  public returnBook(userId : number, bookId : number, borrowedId : number) : Observable<Response>{

    return this.http.delete<any>(`${this.borrowedBookUrl}/${borrowedId}?book.id=${bookId}&user.id=${userId}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(catchError(this.handleError));
  }

  public getIssuedBooks(): Observable<any>{
    return this.http.get<any>(`${this.borrowedBookUrl}?&status=APPROVED`, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }

  public approveBook(borrowedId: number) : Observable<any> {
    return this.http.patch<any>(`${this.borrowedBookUrl}/${borrowedId}`, {status : 'APPROVED'}, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }

  public rejectBook(borrowedId: number): Observable<any> {
    return this.http.delete<any>(`${this.borrowedBookUrl}/${borrowedId}`, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }

  public getRequestedBooks(): Observable<any> {
    return this.http.get<any>(`${this.borrowedBookUrl}?status=PENDING`, {
      headers : {'Authorization' : `Bearer ${this.token}`}
    }).pipe(catchError(this.handleError));
  }

  private handleError(error : HttpErrorResponse) {
    return throwError('Something went wrong!');
  }
}
