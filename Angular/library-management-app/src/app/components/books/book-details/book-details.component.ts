import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookModel } from '../../../models/book.model';
import { MatPaginator } from '@angular/material/paginator';
import { BookService } from '../../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private bookService : BookService, private route : ActivatedRoute, private routes : Router) { } 

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getBooks();
    });
    this.getBooks();
  }

  private getBooks(): void {
    this.bookService.getBooks().then((data) => {
      this.books = data;
      this.dataSource = new MatTableDataSource<BookModel>(this.books);
      this.dataSource.paginator = this.paginator;
    });
  }


  public onDelete(book: any): void{
    this.bookService.removeBook(book.id).then((response) => {
      if (response.ok) {
        this.getBooks();
      }
      else {
        console.log("some thing went wrong...");
      }
    });
  }

  public onNavigate(book: any): void{

    this.routes.navigate([book.id,'update'], { relativeTo: this.route})
  }

  public applyFilter(event: Event): void {
    let filteredValue = (event.target as HTMLInputElement).value;
    filteredValue = filteredValue.trim().toUpperCase();
    this.dataSource.filter = filteredValue;
  }
}
