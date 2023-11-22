import { Book } from "./book";

export class BookData{

    public bookDetails: Book;
    public noOfAvailableBook: number;

    constructor(bookDetails: Book, noOfAvailableBook: number) {
        this.bookDetails = bookDetails;
        this.noOfAvailableBook = noOfAvailableBook;
    }

    public addBook(newBook: number) : void {
        this.noOfAvailableBook += newBook;
    }

    public removeBook(removedBook: number) : void{
        
        this.noOfAvailableBook -= removedBook;
    }
}