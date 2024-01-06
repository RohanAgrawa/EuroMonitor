import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueBookComponent } from '../../components/book-transactions/issue-book/issue-book.component';
import { ReturnBookComponent } from '../../components/book-transactions/return-book/return-book.component';
import { IssuedBooksComponent } from '../../components/book-transactions/issued-books/issued-books.component';
import { BookTransactionsRoutingModule } from './book-transactions-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { BookTransactionService } from '../../services/book-transaction.service';
import { BookApprovalComponent } from '../../components/book-transactions/book-approval/book-approval.component';



@NgModule({
  declarations: [IssueBookComponent, ReturnBookComponent, IssuedBooksComponent, BookApprovalComponent],
  imports: [
    CommonModule,
    BookTransactionsRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers : [BookService, UserService, BookTransactionService]
})
export class BookTransactionsModule { }
