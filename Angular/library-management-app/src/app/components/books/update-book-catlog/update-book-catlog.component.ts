import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { BookModel } from '../../../models/book.model';

@Component({
  selector: 'app-update-book-catlog',
  templateUrl: './update-book-catlog.component.html',
  styleUrl: './update-book-catlog.component.css'
})
export class UpdateBookCatlogComponent implements OnInit{

  @ViewChild('f') public bookForm: NgForm;
  public selectedGenre: string = '';
  public bookDescription: string = '';
  public query: string;
  public id: string;
  public responseError: boolean = false;

  public genres = [
    { genre: 'Fiction', value: 'fiction' },
    { genre: 'Novel', value: 'novel' }
  ];

  constructor(private route: ActivatedRoute, private bookService: BookService, private routes: Router) { 
    
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.bookService.getBook(+this.id).then((data) => {
        this.bookForm.setValue({
          title: data.title,
          author: data.author,
          year: data.publicationYear,
          genre: data.genre,
          isbn: data.isbn,
          description: data.description,
        });

        this.selectedGenre = data.genre;
        this.selectedGenre = this.selectedGenre.toLowerCase();
      });
    });
  }

  onUpdate(): void {

    const updatedBookCatlog = new BookModel(this.bookForm.value.title, this.bookForm.value.author,
      this.bookForm.value.description, this.bookForm.value.genre, this.bookForm.value.year,
      this.bookForm.value.isbn);
    
    this.bookService.updateBook(+this.id, updatedBookCatlog).then((response) => {
      
      if (response.ok) {
        this.routes.navigate(['books'], { queryParams: { bookType: "Updated" }, queryParamsHandling: 'merge' , fragment : this.id});
      }
    });

  }
}
