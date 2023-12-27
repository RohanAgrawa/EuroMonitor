import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { BookService } from '../../../services/book.service';
import { BookTransactionService } from '../../../services/book-transaction.service';
import { BookTransactionModel } from '../../../models/book-transaction.model';
import { BookModel } from '../../../models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrl: './issue-book.component.css'
})
export class IssueBookComponent {

  @ViewChild('f') public bookIssueForm: NgForm;
  public isSubmitted: boolean = false;
  public isSubmittedError: boolean = true;
  public user: UserModel;
  public issuedDate : Date;
  public returnDate: Date;
  public book: BookModel;
  public bookResponse: BookTransactionModel;

  constructor(private userService : UserService, private bookService : BookService, private bookTransactionService : BookTransactionService, private dialog : MatDialog) {
    
  }
  public onIssueBook() : void{

    const userId = this.bookIssueForm.value.userId;
    const bookId = this.bookIssueForm.value.bookId;
    let bookTransaction : BookTransactionModel;

    this.userService.getUser(+userId).subscribe((data) => {
      this.user = new UserModel(data.name, data.phone_no,  data.email, data.userType, null, data.id);
      this.bookService.getBook(+bookId).subscribe((data) => {
        this.book = new BookModel(data.title, data.author, data.description, data.genre, data.year, data.isbn, +data.id);
        bookTransaction = new BookTransactionModel(this.book, this.user, new Date(this.bookIssueForm.value.issueDate), new Date(this.bookIssueForm.value.returnDate));
        this.addBookTransaction(bookTransaction);
      }, err => {
        this.isSubmitted = true;
        this.isSubmittedError = true;
        this.openDialog();
      });
    }, err => {
      this.isSubmitted = true;
      this.isSubmittedError = true;
      this.openDialog();
    });
    
  }

  private addBookTransaction(bookTransaction: BookTransactionModel): void {
    console.log(bookTransaction);
      this.bookTransactionService.borrowBook(bookTransaction).subscribe((data) => {
        this.isSubmittedError = false;
        this.bookResponse = data;
        this.bookIssueForm.resetForm();
        this.book = null;
        this.user = null;

      }, (error) => {
        this.openDialog();
        this.isSubmittedError = true;
      });
      this.isSubmitted = true;
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}
