"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("../input");
var library_1 = require("./library");
var library = new library_1.Library();
function displayMenu() {
    console.log();
    console.log("--------------------------------------------------------------------------");
    console.log("1. Book Issue");
    console.log("2. Show Books");
    console.log("3. Book release");
    console.log("4. Add Book to Library");
    console.log("5. Remove Book to Library");
    console.log("6. Cancel");
    input_1.r.question("Enter your choice :- ", function (options) {
        if (options == "1") {
            input_1.r.question("Provide Title of Book for checkout :- ", function (titleOfBook) {
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
            input_1.r.question("Provide Title for returning Book to Library:- ", function (titleOfBook) {
                if (titleOfBook) {
                    library.releasedBookfromUser(titleOfBook);
                }
                else {
                    console.log("Enter non empty title");
                }
            });
        }
        else if (options == "4") {
            input_1.r.question("Provide Title of Book for adding in Library :- ", function (titleOfBook) {
                input_1.r.question("Provide Author of Book for adding in Library :- ", function (authorOfBook) {
                    input_1.r.question("Provide the number of Book to add in Library value should be greater than 0 :- ", function (numberOfCopies) {
                        if (parseInt(numberOfCopies) <= 0) {
                            input_1.r.question("Enter copies value greater than 0 :- ", function (copies) {
                                if (parseInt(copies) <= 0) {
                                    console.log("Entered copies are incorrect for adding book in library .... process again.");
                                    displayMenu();
                                }
                                else {
                                    library.addBookInLibrary(titleOfBook, authorOfBook, parseInt(copies));
                                }
                            });
                        }
                        else {
                            library.addBookInLibrary(titleOfBook, authorOfBook, parseInt(numberOfCopies));
                        }
                    });
                });
            });
        }
        else if (options == "5") {
            input_1.r.question("Provide Title of Book for removing Book from Library :- ", function (titleOfBook) {
                input_1.r.question("Provide the number of Book to remove from Library value should be greater than 1 :- ", function (numberOfCopies) {
                    library.removeBookInLibrary(titleOfBook, parseInt(numberOfCopies));
                });
            });
        }
        else if (options == "6") {
            input_1.r.close();
        }
        else {
            console.log("Enter the correct choice");
            displayMenu();
        }
    });
}
exports.default = displayMenu;
