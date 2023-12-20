import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl: string = "http://localhost:3000/books";

  constructor() { }

  public async addBook(bookCatlog : BookModel) : Promise<any> {

    return await fetch(this.bookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookCatlog)
    });
  }

  public async updateBook(id : number, user : BookModel) {
    const response = await fetch(`${this.bookUrl}/${id}`, { 
      method: 'PUT', 
      headers: { 
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify(user) 
    });
    
    return response;
  }

  public async getBooks() : Promise<any>{
    const data = await fetch(this.bookUrl);
    if(data.ok)
      return await data.json() ?? [];
    else
      return null
  }

  public async getBook(id: number): Promise<any>{
    
    const data = (await fetch(`${this.bookUrl}/${id}`));

    if (data.ok)
      return await data.json() ?? {};
    else
      return null;
  }

  public removeBook(id : number) : Promise<Response>{
    
    const response = fetch(`${this.bookUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }
}
