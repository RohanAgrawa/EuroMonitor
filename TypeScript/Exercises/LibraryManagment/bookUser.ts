import { Book } from "./book";

export class BookUser{

    public id: number;
    public issuedBooks: Map<String, Book>;
    public name: string;

    constructor(name: string) {
        
        this.name = name;
        let randomId = Math.random() * 10;

        this.id = Math.round(randomId);
        this.issuedBooks = new Map();
    }

    public borrowBook(borrowedBook: Book) : String{
        
        if (this.issuedBooks.size < 3) {
            
            this.issuedBooks.set(borrowedBook.title, borrowedBook);

            return "success";
        }

        else {
            console.log("Your Book issue limit already reached to 3 no more books are allowed to checkout.");
            return "failed";
        }
    }

    public releaseBook(releasedBook: Book): String{
        
        if (this.issuedBooks.has(releasedBook.title)) {
            
            this.issuedBooks.delete(releasedBook.title);

            return "success";
        }

        else {
            console.log("Give valid title to realse the book");
            return "failed";
        }
    }
}