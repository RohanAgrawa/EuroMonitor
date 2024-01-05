import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';

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

  constructor(private bookService : BookService, private route : ActivatedRoute, private routes : Router, private dialog : MatDialog) { } 

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getBooks();
    });
  }

  private getBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.dataSource = new MatTableDataSource<BookModel>(this.books);
      this.dataSource.paginator = this.paginator;
    }, (error) => { this.openDialog();});
  }

  public onBorrow(book: any): void{
    
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
