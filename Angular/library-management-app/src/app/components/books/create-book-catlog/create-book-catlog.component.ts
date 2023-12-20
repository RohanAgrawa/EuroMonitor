import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { BookModel } from '../../../models/book.model';

@Component({
  selector: 'app-create-book-catlog',
  templateUrl: './create-book-catlog.component.html',
  styleUrl: './create-book-catlog.component.css'
})
export class CreateBookCatlogComponent {

  @ViewChild('f') public bookForm: NgForm;
  public isSubmitted: boolean = false;
  public isSubmittedError: boolean = true;
  public selectedGenre: string = '';
  public bookDescription: string = '';
  public bookResponse: BookModel;
  
  public genres = [
    { genre: 'Fiction', value: 'fiction' },
    { genre: 'Novel', value: 'novel' }
  ];

  constructor(private bookService : BookService) { }
   
  public onsubmit(): void {

    const bookCatlog = new BookModel(this.bookForm.value.title, this.bookForm.value.author,
      this.bookForm.value.description, this.bookForm.value.genre, this.bookForm.value.year,
      this.bookForm.value.isbn);
    
    const response: Promise<any> = this.bookService.addBook(bookCatlog);

    response.then((response: Response) => {
      if (response.ok) {
        this.isSubmittedError = false;
        response.json().then((data) => {
          this.bookResponse = data;
        });
      }
      this.isSubmitted = true;
      this.bookForm.resetForm();
    });
  }
}
