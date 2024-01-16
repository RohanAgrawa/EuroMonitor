import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BookTransactionResponseModel } from '../../../models/book-transaction-response.model';
import { BookTransactionService } from '../../../services/book-transaction.service';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';
import { BookTransactionModel } from '../../../models/book-transaction.model';
import { UserService } from '../../../services/user.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-book-approval',
  templateUrl: './book-approval.component.html',
  styleUrl: './book-approval.component.css'
})
export class BookApprovalComponent implements OnInit{

  public displayedColumns: string[] = ['borrowId', 'bookId', 'bookTitle', 'userId', 'userName', 'userEmail', 'issueDate', 'returnDate', 'approve', 'reject'];

  public dataSource: MatTableDataSource<BookTransactionResponseModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookTransactionService: BookTransactionService, private dialog: MatDialog, private userService : UserService, private _liveAnnouncer: LiveAnnouncer) { }
  
  public ngOnInit(): void {
      this.getRequestedBooks();
  }

  public getRequestedBooks(): void {
    this.bookTransactionService.getRequestedBooks().subscribe((data) => {

      const bookTransactions: BookTransactionResponseModel[] = [];

      for (const bookTransaction of data) {
        bookTransactions.push(new BookTransactionResponseModel(bookTransaction.id, +bookTransaction.book.id, +bookTransaction.user.id, new Date(bookTransaction.issueDate), new Date(bookTransaction.returnDate), bookTransaction.user.name, bookTransaction.book.title, bookTransaction.user.email, bookTransaction.status,));
      }

      this.dataSource = new MatTableDataSource<BookTransactionResponseModel>(bookTransactions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: BookTransactionResponseModel, filter: string) => {
        return this.filterPredicate(data, filter);
      }
    }, err => { this.openDialog(); });
  }

  private filterPredicate(data: BookTransactionResponseModel, filter: string): boolean {
    return data.userId.toString().includes(filter) || data.userEmail.includes(filter.toUpperCase()) || data.bookId.toString().includes(filter) || data.bookTitle.includes(filter.toUpperCase());
  }

  public applyFilter(event: Event): void {
    let filteredValue = (event.target as HTMLInputElement).value;
    filteredValue = filteredValue.trim().toLowerCase();
    this.dataSource.filter = filteredValue;
  }

  public announceSortChange(sortState: Sort) : void{

    if (sortState.direction)
    {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }
    else
    {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public onApproveBook(bookTransaction: any): void {
    
    this.bookTransactionService.approveBook(bookTransaction.borrowId).subscribe((response) => {
      this.getRequestedBooks();
    }, (error) => { this.openDialog(); });
  }

  public onRejectBook(bookTransaction: any): void {
    this.bookTransactionService.rejectBook(bookTransaction.borrowId).subscribe((response) => {
      this.getRequestedBooks();
    }, (error) => { this.openDialog(); });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }

}
