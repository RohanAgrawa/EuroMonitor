import { BookModel } from "./book.model";
import { UserModel } from "./user.model";

export class BookTransactionModel {

    public book: BookModel;
    public user : UserModel;
    public issueDate: string;
    public returnDate: string;

    constructor(book : BookModel, user : UserModel, issueDate, returnDate) {
        this.book = book;
        this.user = user;
        const issueBookDate : Date = issueDate;
        this.issueDate = issueBookDate.getDate() + "/" + issueBookDate.getMonth() + "/" + issueBookDate.getFullYear();
        const returnBookDate : Date = returnDate;
        this.returnDate = returnBookDate.getDate() + "/" + returnBookDate.getMonth() + "/" + returnBookDate.getFullYear();
    }
}