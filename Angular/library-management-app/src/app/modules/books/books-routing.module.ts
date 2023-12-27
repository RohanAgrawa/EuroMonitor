import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateBookCatlogComponent } from "../../components/books/create-book-catlog/create-book-catlog.component";
import { BookDetailsComponent } from "../../components/books/book-details/book-details.component";
import { UpdateBookCatlogComponent } from "../../components/books/update-book-catlog/update-book-catlog.component";

const routes: Routes = [
    {
        path: 'books', component: BookDetailsComponent, title: 'Books', children: 
        [
            { path: ':id/update', component: UpdateBookCatlogComponent, title: 'Update Book' }
        ]
    },
    { path: 'create-book', component: CreateBookCatlogComponent, title: 'Create Book' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }