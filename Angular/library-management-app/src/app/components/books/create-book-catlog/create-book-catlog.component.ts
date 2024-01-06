import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { BookModel } from '../../../models/book.model';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-book-catlog',
  templateUrl: './create-book-catlog.component.html',
  styleUrl: './create-book-catlog.component.css'
})
export class CreateBookCatlogComponent {

  @ViewChild('f') public bookForm: NgForm;
  public isSubmittedError: boolean = true;
  public selectedGenre: string = '';
  public bookDescription: string = '';
  public bookId: string = '';
  public isSubmitted: boolean = false;
  
  public genres = [
    { genre: 'Fiction', value: 'fiction' },
    { genre: 'Novel', value: 'novel' },
    { genre: 'Other', value: 'other'}
  ];

  constructor(private bookService : BookService, private dialog : MatDialog, private routes : Router) { }
   
  public onsubmit(): void {

    this.isSubmitted = true
    const bookCatlog = new BookModel(this.bookForm.value.title, this.bookForm.value.author,
      this.bookForm.value.description, this.bookForm.value.genre, this.bookForm.value.year,
      this.bookForm.value.isbn);
    
    this.bookService.addBook(bookCatlog).subscribe((data) => {
      this.bookId = data.id;
      this.bookForm.resetForm();
      this.isSubmittedError = false;
      this.routes.navigate(['/dashboard', 'books']);
    }, (error) => {
      this.isSubmittedError = true;
      this.openDialog();
    });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}
