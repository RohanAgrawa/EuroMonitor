import { BookModel } from "./book.model";
import { UserModel } from "./user.model";

export class BookTransactionModel {

    public book: BookModel;
    public user : UserModel;
    public issueDate: Date;
    public returnDate: Date;
    public status: string;

    constructor(book: BookModel, user: UserModel, issueDate: Date, returnDate: Date, status: string) {
        this.book = new BookModel(book.getTitle(), book.getAuthor(), book.getDescription(), book.getGenre(), book.getPublicationYear(), book.getIsbn(), book.getId());
        this.user = new UserModel(user.getName(), user.getPhone_no(), user.getEmail(), user.getRole(), user.getPassword(), user.getId());
        this.issueDate = issueDate;
        this.returnDate = returnDate;
        this.status = status;
    }
}