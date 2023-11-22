import displayMenu from "./displayMenu";
import { r } from "../input";
import { Book } from "./book";
import { BookData } from "./bookData";
import { BookUser } from "./bookUser";

export class Library{

    public books: Map<string, BookData>;
    public usersOfLibrary: Map<number, BookUser>;

    constructor() {
        this.usersOfLibrary = new Map();
        this.books = new Map();
    }

    public addBookInLibrary(titleOfBook: string, authorOfBook: string, numberOfBooks: number) : void {
        
        if (this.books.has(titleOfBook)) {
            
            let bookInformation = this.books.get(titleOfBook);

            if (bookInformation != null) {
                bookInformation.addBook(numberOfBooks);
                displayMenu();
            }
        }
        else {
            
            let newBook = new Book(titleOfBook, authorOfBook);

            let newBookData = new BookData(newBook, numberOfBooks);

            this.books.set(titleOfBook, newBookData);
            displayMenu();
        }
    }

    public removeBookInLibrary(titleOfBook : string, numberOfBooks : number) : void {
        
        if (this.books.has(titleOfBook)) {
            
            let bookInfo = this.books.get(titleOfBook)!;

            
                
                let avilableBook = bookInfo.noOfAvailableBook;

                if (avilableBook == 0) {
                    
                    console.log(`${titleOfBook} this book is not present in library for removing.`);
                    displayMenu();
                }

                let remainingBook = avilableBook - numberOfBooks;

                if (remainingBook < 0) {
                    console.log("Enter valid number of book to remove from library.");
                    displayMenu();
                }

                else {

                    bookInfo.noOfAvailableBook = remainingBook;
                    
                    displayMenu();
                }
            
        }

        else {
            
            console.log(`Book for this name :- ${titleOfBook} is not present in Library.`);
            displayMenu();
        }
    }

    public issueBookToUser(titleOfBook: string): void {
        
        

        if (this.books.size == 0) {
            
            console.log("No Books prsent in the library... first add books in library to issue a book");
            displayMenu();
        }
        
        else if (this.books.has(titleOfBook)) {

            console.log("1. Existing User");
            console.log("2. New User");
            
            r.question("Enter Your Choice :- ", (loginInfo) => {
                
                let checkoutBookInfo = this.books.get(titleOfBook)!;

                if (loginInfo == "1") {
                    
                    r.question("Please provide your Library Id :- ", (idOfUser) => {
                        
                        let Id = parseInt(idOfUser);

                        if (this.usersOfLibrary.has(Id)) {
                        
                            let userInfo = this.usersOfLibrary.get(Id)!;

                            updateIssuedBook(checkoutBookInfo, userInfo);   
                        }
                        else {
                            
                            r.question("Provide Valid Id :- ", (idOfUser) => {
                                let Id = parseInt(idOfUser);

                                if (this.usersOfLibrary.has(Id)) {
                        
                                    let userInfo = this.usersOfLibrary.get(Id)!;
                            
                                    updateIssuedBook(checkoutBookInfo, userInfo);
                                    
                                }
                                else {
                                    
                                    console.log("Process again ....");
                                    displayMenu();
                                }
                            });
                        }
                    })
                }
            

                else {
                    
                    r.question("Provide your name for registration in Library :- ", (name) => {
                        let user = new BookUser(name);
                        this.usersOfLibrary.set(user.id, user);
                        console.log(`Id for future refrence ${user.id}`);

                        
                        updateIssuedBook(checkoutBookInfo, user);
                        
                    });
                }
            })
        }

        else {
            
            console.log(`${titleOfBook} Book is not present in Library .... first add book to library to issue the book.`);
            displayMenu();
        }
    }

    public releasedBookfromUser(titleOfBook: string): void {
        
        function updateReleasedBook(releasedBookInfo: BookData, userInfo: BookUser) {
            
            let response = userInfo.releaseBook(releasedBookInfo.bookDetails);

                    if (response == "success") {
                        
                        releasedBookInfo.addBook(1);
                        displayMenu();
                    }
                    else {
                        displayMenu();
                    }
        }
        
        if (!this.books.has(titleOfBook)) {
            
            console.log("Invalid title provided for returning book. ");

            displayMenu();
        }
        
        let releasedBookInfo = this.books.get(titleOfBook)!;

        r.question("Please provide your Library Id :- ", (idOfUser) => {
            let Id = parseInt(idOfUser);

            if (this.usersOfLibrary.has(Id)) {

                let userInfo = this.usersOfLibrary.get(Id)!;
    
                updateReleasedBook(releasedBookInfo, userInfo);
    
            }

            else {
                
                r.question("Provide valid Id for returning the book :- ", (idOfUser) => {
                    
                    let Id = parseInt(idOfUser);

                    if (this.usersOfLibrary.has(Id)) {

                        let userInfo = this.usersOfLibrary.get(Id)!;
                    
                        updateReleasedBook(releasedBookInfo, userInfo);       
                    }

                    else {
                        console.log("Process agian ....");
                        displayMenu();
                    }
                })
            }
        });
    }

    public listAllBook() : void{

        if (this.books.size == 0) {
            console.log("No Books availble in Library.")

            displayMenu();
        }
        
        else {

            console.log("Availble Books in Library.")

            this.books.forEach((values, keys) => {
                let bookInfor = values.bookDetails;
                if (values.noOfAvailableBook > 0) {
                    console.log(`Title of Book is ${bookInfor.title} and author is ${bookInfor.author} and copies availble is ${values.noOfAvailableBook}`);
                }
            })

            displayMenu();
        }
    }
}


function updateIssuedBook(checkoutBookInfo: BookData, userInfo : BookUser) : void{
            
    if (checkoutBookInfo.noOfAvailableBook > 0) {
                            
        let response = userInfo.borrowBook(checkoutBookInfo.bookDetails);

        if (response == "success") {
            
            checkoutBookInfo.removeBook(1);
            displayMenu();
        }
        else {
            displayMenu();
        }
    }
}