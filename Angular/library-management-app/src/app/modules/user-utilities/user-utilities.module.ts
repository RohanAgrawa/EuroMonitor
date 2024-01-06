import { NgModule } from "@angular/core";
import { BorrowedStatusComponent } from "../../components/user-utilities/borrowed-status/borrowed-status.component";
import { BooksComponent } from "../../components/user-utilities/books/books.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { BookService } from "../../services/book.service";
import { UserUtilitiesRoutingModule } from "./user-utilities-routing.module";
import { RequestBookService } from "../../services/request-book.service";

@NgModule({
    declarations: [
        BorrowedStatusComponent,
        BooksComponent
    ],
    imports: [
        UserUtilitiesRoutingModule,
        MaterialModule,
        FormsModule,
        HttpClientModule,
        CommonModule
    ],

    providers: [BookService, RequestBookService],
})

export class UserUtilitiesModule { }