import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IssueBookComponent } from "../../components/book-transactions/issue-book/issue-book.component";
import { ReturnBookComponent } from "../../components/book-transactions/return-book/return-book.component";
import { IssuedBooksComponent } from "../../components/book-transactions/issued-books/issued-books.component";

const routes: Routes = [
    { path: 'issue-book', component: IssueBookComponent, title: 'Issue Book' },
  { path: 'return-book', component: ReturnBookComponent, title: 'Return Book' },
  { path : 'issued-books', component : IssuedBooksComponent, title : 'Issued Books'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookTransactionsRoutingModule { }