import { r } from "../input";
import { Library } from "./library";


let library = new Library();

export default function displayMenu(): void {
    
    console.log();

    console.log("--------------------------------------------------------------------------");
    
    console.log("1. Book Issue");
    console.log("2. Show Books");
    console.log("3. Book release");
    console.log("4. Add Book to Library");
    console.log("5. Remove Book to Library");
    console.log("6. Cancel");

    r.question("Enter your choice :- ", (options) => {
        
        if (options == "1") {
        
            r.question("Provide Title of Book for checkout :- ", (titleOfBook) => {

                if (titleOfBook) {
                    library.issueBookToUser(titleOfBook);
                }
                else {
                    console.log("Enter non empty title");
                }
            });
        }
    
        else if (options == "2") {
            library.listAllBook();
        }
    
        else if (options == "3") {
            
            r.question("Provide Title for returning Book to Library:- ", (titleOfBook) => {

                if (titleOfBook) {
                    library.releasedBookfromUser(titleOfBook);
                }
                else {
                    console.log("Enter non empty title");
                }
            })
        }
    
        else if (options == "4") {

            r.question("Provide Title of Book for adding in Library :- ", (titleOfBook) => {
                
                r.question("Provide Author of Book for adding in Library :- ", (authorOfBook) => {
                    
                    r.question("Provide the number of Book to add in Library value should be greater than 0 :- ", (numberOfCopies) => {
                        
                        if (parseInt(numberOfCopies) <= 0) {
                            
                            r.question("Enter copies value greater than 0 :- ", (copies)=> {
                                
                                if (parseInt(copies) <= 0) {
                                    
                                    console.log("Entered copies are incorrect for adding book in library .... process again.");
                                    displayMenu();
                                }
                                else {
                                    library.addBookInLibrary(titleOfBook, authorOfBook, parseInt(copies));
                                }
                            })
                        }
                        else {
                            library.addBookInLibrary(titleOfBook, authorOfBook, parseInt(numberOfCopies));    
                        }
                    })
                })
            })
        }
    
        else if (options == "5") {

            r.question("Provide Title of Book for removing Book from Library :- ", (titleOfBook) => {
                r.question("Provide the number of Book to remove from Library value should be greater than 1 :- ", (numberOfCopies) => {
                    library.removeBookInLibrary(titleOfBook, parseInt(numberOfCopies));
                })
            });
        }
        else if (options == "6") {
            r.close();
        }
        else {
            
            console.log("Enter the correct choice");
            displayMenu();
        }
    });

    
}