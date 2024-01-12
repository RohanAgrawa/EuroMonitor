import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestBookService } from '../../../services/request-book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BookTransactionResponseModel } from '../../../models/book-transaction-response.model';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-borrowed-status',
  templateUrl: './borrowed-status.component.html',
  styleUrl: './borrowed-status.component.css'
})
export class BorrowedStatusComponent implements OnInit{

  public displayedColumns: string[] = ['borrowId', 'bookId', 'bookTitle', 'userId', 'userName', 'userEmail', 'issueDate', 'returnDate', 'borrowingStatus'];
  public dataSource: MatTableDataSource<BookTransactionResponseModel>;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private requestBookService : RequestBookService, private dialog : MatDialog) { }

  public ngOnInit(): void {
    this.getBorrowedBooks();
  }
  public getBorrowedBooks(): void {
    const user = JSON.parse(localStorage.getItem('publicData'));
    this.requestBookService.getBorrowedBooks(user[0].id).subscribe((data) => {
     
      const bookTransactions: BookTransactionResponseModel[] = [];

      for (const bookTransaction of data) {
        bookTransactions.push(new BookTransactionResponseModel(bookTransaction.id, +bookTransaction.book.id, +bookTransaction.user.id, new Date(bookTransaction.issueDate), new Date(bookTransaction.returnDate), bookTransaction.user.name, bookTransaction.book.title, bookTransaction.user.email, bookTransaction.status));
      }

      this.dataSource = new MatTableDataSource<BookTransactionResponseModel>(bookTransactions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: BookTransactionResponseModel, filter: string) => {
        return this.filterPredicate(data, filter);
      }
    }, (error) => { this.openDialog();});
  }


  private filterPredicate(data: BookTransactionResponseModel, filter: string): boolean {
    return data.userId.toString().includes(filter) || data.userEmail.includes(filter.toUpperCase()) || data.bookId.toString().includes(filter) || data.bookTitle.includes(filter.toUpperCase());
  }

  public applyFilter(event: Event): void {
    let filteredValue = (event.target as HTMLInputElement).value;
    filteredValue = filteredValue.trim().toLowerCase();
    this.dataSource.filter = filteredValue;
  }


  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}
