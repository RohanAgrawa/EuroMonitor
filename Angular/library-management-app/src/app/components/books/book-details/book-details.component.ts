import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookModel } from '../../../models/book.model';
import { MatPaginator } from '@angular/material/paginator';
import { BookService } from '../../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{

  public displayedColumns: string[] = ['id', 'title', 'author', 'publicationYear', 'genre', 'isbn', 'edit', 'delete'];

  public dataSource: MatTableDataSource<BookModel>;

  public books: BookModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService : BookService, private route : ActivatedRoute, private routes : Router, private dialog : MatDialog, private _liveAnnouncer: LiveAnnouncer) { } 

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getBooks();
    });
  }

  private getBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.books = this.books.reverse();
      this.dataSource = new MatTableDataSource<BookModel>(this.books);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (error) => { this.openDialog();});
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

  public onDelete(book: any): void{
    this.bookService.removeBook(book.id).subscribe((response) => {
      this.getBooks();
    }, (error) => { this.openDialog();});
  }

  public onNavigate(book: any): void{

    this.routes.navigate([book.id,'update'], { relativeTo: this.route})
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
