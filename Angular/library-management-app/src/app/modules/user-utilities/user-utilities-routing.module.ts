import { RouterModule, Routes } from "@angular/router";
import { BooksComponent } from "../../components/user-utilities/books/books.component";
import { BorrowedStatusComponent } from "../../components/user-utilities/borrowed-status/borrowed-status.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'book-list', component: BooksComponent, title: 'Books'
    },
    { path: 'borrowed-books', component: BorrowedStatusComponent, title: 'Borrowed Status' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserUtilitiesRoutingModule { }