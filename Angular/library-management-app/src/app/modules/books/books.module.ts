import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateBookCatlogComponent } from '../../components/books/create-book-catlog/create-book-catlog.component';
import { BookDetailsComponent } from '../../components/books/book-details/book-details.component';
import { UpdateBookCatlogComponent } from '../../components/books/update-book-catlog/update-book-catlog.component';
import { MaterialModule } from '../material/material.module';
import { BookService } from '../../services/book.service';



@NgModule({
  declarations: [
    CreateBookCatlogComponent,
    BookDetailsComponent,
    UpdateBookCatlogComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers : [BookService]
})
export class BooksModule { }
