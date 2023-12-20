import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookTransactionService } from '../../../services/book-transaction.service';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent {

  @ViewChild('f') public bookReturnForm: NgForm;

  public isSubmitted: boolean = false;
  public isSubmittedError: boolean = false;

  constructor(private bookTransactionService : BookTransactionService) { }

  public onReturnBook()  : void{
    const userId = this.bookReturnForm.value.userId;
    const bookId = this.bookReturnForm.value.bookId;
    const borrowedId = this.bookReturnForm.value.borrowId;

    const response = this.bookTransactionService.returnBook(+userId, +bookId, +borrowedId);

    response.then((response: Response) => {
      if (response.ok) {
        this.isSubmittedError = false;
        this.bookReturnForm.resetForm();
      }
      else {
        this.isSubmittedError = true;
      }
    }); 
    this.isSubmitted = true;
  }
}
