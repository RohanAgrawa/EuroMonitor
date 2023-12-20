import { Injectable } from '@angular/core';
import { BookTransactionModel } from '../models/book-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class BookTransactionService {

  private borrowedBookUrl: string = "http://localhost:3000/borrow";

  constructor() { }


  public async borrowBook(borrowedBook : BookTransactionModel) : Promise<any> {

    return await fetch(this.borrowedBookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(borrowedBook)
    });
  }

  public returnBook(userId : number, bookId : number, borrowedId : number) : Promise<Response>{

    return fetch(`${this.borrowedBookUrl}/${borrowedId}?book.id=${bookId}&user.id=${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
