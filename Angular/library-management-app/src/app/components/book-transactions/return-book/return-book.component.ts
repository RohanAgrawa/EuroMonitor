import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookTransactionService } from '../../../services/book-transaction.service';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent {

  @ViewChild('f') public bookReturnForm: NgForm;

  public isSubmitted: boolean = false;
  public isSubmittedError: boolean = true;

  constructor(private bookTransactionService : BookTransactionService, private dialog : MatDialog) { }

  public onReturnBook()  : void{
    const userId = this.bookReturnForm.value.userId;
    const bookId = this.bookReturnForm.value.bookId;
    const borrowedId = this.bookReturnForm.value.borrowId;
    this.isSubmitted = true;

    this.bookTransactionService.returnBook(+userId, +bookId, +borrowedId).subscribe((response) => {
      this.bookReturnForm.resetForm();
      this.isSubmittedError = false;
    }, (error) => {
      this.isSubmittedError = true;
    });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}
