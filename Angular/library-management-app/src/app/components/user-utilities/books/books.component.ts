import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';
import { RequestBookService } from '../../../services/request-book.service';
import { UserModel } from '../../../models/user.model';
import { BookTransactionModel } from '../../../models/book-transaction.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  public displayedColumns: string[] = ['id', 'title', 'author', 'publicationYear', 'genre', 'isbn', 'borrow'];

  public dataSource: MatTableDataSource<BookModel>;

  public books: BookModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookService : BookService, private route : ActivatedRoute, private routes : Router, private dialog : MatDialog, private requestBook : RequestBookService) { } 

  public ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.dataSource = new MatTableDataSource<BookModel>(this.books);
      this.dataSource.paginator = this.paginator;
    }, (error) => { this.openDialog();});
  }

  public onBorrow(book: any): void{
    
    
    const bookModel = new BookModel(book.title, book.author, book.description, book.genre, book.publicationYear, book.isbn, +book.id);
    const user = JSON.parse(localStorage.getItem('publicData'));
    
    if (user === null) {
      return;
    }
  
   
    const userModel = new UserModel(user[0].name, user[0].phone_no, user[0].email, user[0].userType, null, user[0].id);

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 10);
    
    const borrowedBook = new BookTransactionModel(bookModel, userModel, new Date(), returnDate, 'PENDING');

    this.requestBook.requestBook(borrowedBook).subscribe((data) => {
      
    }, (error) => { this.openDialog();});
  }

  public applyFilter(event: Event): void {
    let filteredValue = (event.target as HTMLInputElement).value;
    filteredValue = filteredValue.trim().toUpperCase();
    this.dataSource.filter = filteredValue;
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}
