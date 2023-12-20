import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { BookService } from '../../../services/book.service';
import { BookTransactionService } from '../../../services/book-transaction.service';
import { BookTransactionModel } from '../../../models/book-transaction.model';
import { BookModel } from '../../../models/book.model';

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

  constructor(private userService : UserService, private bookService : BookService, private bookTransactionService : BookTransactionService) {
    
  }
  async onIssueBook() {

    const userId = this.bookIssueForm.value.userId;
    const bookId = this.bookIssueForm.value.bookId;

    await this.userService.getUser(+userId).then((data) => {
      this.user = data;
    });
    await this.bookService.getBook(+bookId).then((data) => {
      this.book = data;
    })
    if (this.book === null || this.user === null) {
      this.isSubmitted = true;
      this.isSubmittedError = true;
      console.log("User or Book not found");
    }
    else {
      const bookTransaction = new BookTransactionModel(this.book, this.user, this.bookIssueForm.value.issueDate, this.bookIssueForm.value.returnDate);

      const response = await this.bookTransactionService.borrowBook(bookTransaction);

      if(response.ok){
        this.isSubmittedError = false;

        response.json().then((data) => {
          this.bookResponse = data;
        });
        this.bookIssueForm.resetForm();
      }

      this.isSubmitted = true;
    }
  }
}
