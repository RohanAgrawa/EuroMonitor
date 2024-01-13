import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BookTransactionResponseModel } from '../../../models/book-transaction-response.model';
import { BookTransactionService } from '../../../services/book-transaction.service';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-issued-books',
  templateUrl: './issued-books.component.html',
  styleUrl: './issued-books.component.css'
})
  
export class IssuedBooksComponent implements OnInit{

  public displayedColumns: string[] = ['borrowId', 'bookId', 'bookTitle', 'userId', 'userName', 'userEmail', 'issueDate', 'returnDate', 'delete'];

  public dataSource: MatTableDataSource<BookTransactionResponseModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookTransactionService : BookTransactionService, private dialog : MatDialog, private userService : UserService, private _liveAnnouncer: LiveAnnouncer ) { }
 
  
  public ngOnInit() {
    this.getIssuedBooks();
  }

  public getIssuedBooks(): void {
    this.bookTransactionService.getIssuedBooks().subscribe((data) => {

      let bookTransactions: BookTransactionResponseModel[] = [];

      for (const bookTransaction of data) {
        bookTransactions.push(new BookTransactionResponseModel(bookTransaction.id, +bookTransaction.book.id, +bookTransaction.user.id, new Date(bookTransaction.issueDate), new Date(bookTransaction.returnDate), bookTransaction.user.name, bookTransaction.book.title, bookTransaction.user.email));
      }

      bookTransactions = bookTransactions.reverse();

      this.dataSource = new MatTableDataSource<BookTransactionResponseModel>(bookTransactions);
      this.dataSource.paginator = this.paginator;
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

  public onReturnBook(bookTransaction: any): void {

    this.userService.getUser(+bookTransaction.userId).subscribe((response) => {
      this.userService.updateBookCount(+bookTransaction.userId, (response.bookCount) - 1).subscribe((response) => {
        console.log(response);
      });
    });

    this.bookTransactionService.returnBook(bookTransaction.userId, bookTransaction.bookId, bookTransaction.borrowId).subscribe((response) => {
      this.getIssuedBooks();
    }, (error) => { this.openDialog(); });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}