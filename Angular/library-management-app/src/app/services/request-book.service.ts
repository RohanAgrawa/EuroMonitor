import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookTransactionModel } from "../models/book-transaction.model";
import { catchError, throwError } from "rxjs";

@Injectable()

export class RequestBookService {
    
    private url : string = "http://localhost:3000/borrow";
    
    constructor(private http: HttpClient) { }
    
    public requestBook(borrowedBook : BookTransactionModel) {
        
        return this.http.post<any>(this.url, borrowedBook).pipe(catchError(this.handleError));
    }

    public getBorrowedBooks(userId : number) {

        return this.http.get<any>(`${this.url}?user.id=${userId}`).pipe(catchError(this.handleError));
    }

  private handleError(error : HttpErrorResponse) {
    return throwError('Something went wrong!');
  }
}