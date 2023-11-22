"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
var displayMenu_1 = require("./displayMenu");
var input_1 = require("../input");
var book_1 = require("./book");
var bookData_1 = require("./bookData");
var bookUser_1 = require("./bookUser");
var Library = /** @class */ (function () {
    function Library() {
        this.usersOfLibrary = new Map();
        this.books = new Map();
    }
    Library.prototype.addBookInLibrary = function (titleOfBook, authorOfBook, numberOfBooks) {
        if (this.books.has(titleOfBook)) {
            var bookInformation = this.books.get(titleOfBook);
            if (bookInformation != null) {
                bookInformation.addBook(numberOfBooks);
                (0, displayMenu_1.default)();
            }
        }
        else {
            var newBook = new book_1.Book(titleOfBook, authorOfBook);
            var newBookData = new bookData_1.BookData(newBook, numberOfBooks);
            this.books.set(titleOfBook, newBookData);
            (0, displayMenu_1.default)();
        }
    };
    Library.prototype.removeBookInLibrary = function (titleOfBook, numberOfBooks) {
        if (this.books.has(titleOfBook)) {
            var bookInfo = this.books.get(titleOfBook);
            var avilableBook = bookInfo.noOfAvailableBook;
            if (avilableBook == 0) {
                console.log("".concat(titleOfBook, " this book is not present in library for removing."));
                (0, displayMenu_1.default)();
            }
            var remainingBook = avilableBook - numberOfBooks;
            if (remainingBook < 0) {
                console.log("Enter valid number of book to remove from library.");
                (0, displayMenu_1.default)();
            }
            else {
                bookInfo.noOfAvailableBook = remainingBook;
                (0, displayMenu_1.default)();
            }
        }
        else {
            console.log("Book for this name :- ".concat(titleOfBook, " is not present in Library."));
            (0, displayMenu_1.default)();
        }
    };
    Library.prototype.issueBookToUser = function (titleOfBook) {
        var _this = this;
        if (this.books.size == 0) {
            console.log("No Books prsent in the library... first add books in library to issue a book");
            (0, displayMenu_1.default)();
        }
        else if (this.books.has(titleOfBook)) {
            console.log("1. Existing User");
            console.log("2. New User");
            input_1.r.question("Enter Your Choice :- ", function (loginInfo) {
                var checkoutBookInfo = _this.books.get(titleOfBook);
                if (loginInfo == "1") {
                    input_1.r.question("Please provide your Library Id :- ", function (idOfUser) {
                        var Id = parseInt(idOfUser);
                        if (_this.usersOfLibrary.has(Id)) {
                            var userInfo = _this.usersOfLibrary.get(Id);
                            updateIssuedBook(checkoutBookInfo, userInfo);
                        }
                        else {
                            input_1.r.question("Provide Valid Id :- ", function (idOfUser) {
                                var Id = parseInt(idOfUser);
                                if (_this.usersOfLibrary.has(Id)) {
                                    var userInfo = _this.usersOfLibrary.get(Id);
                                    updateIssuedBook(checkoutBookInfo, userInfo);
                                }
                                else {
                                    console.log("Process again ....");
                                    (0, displayMenu_1.default)();
                                }
                            });
                        }
                    });
                }
                else {
                    input_1.r.question("Provide your name for registration in Library :- ", function (name) {
                        var user = new bookUser_1.BookUser(name);
                        _this.usersOfLibrary.set(user.id, user);
                        console.log("Id for future refrence ".concat(user.id));
                        updateIssuedBook(checkoutBookInfo, user);
                    });
                }
            });
        }
        else {
            console.log("".concat(titleOfBook, " Book is not present in Library .... first add book to library to issue the book."));
            (0, displayMenu_1.default)();
        }
    };
    Library.prototype.releasedBookfromUser = function (titleOfBook) {
        var _this = this;
        function updateReleasedBook(releasedBookInfo, userInfo) {
            var response = userInfo.releaseBook(releasedBookInfo.bookDetails);
            if (response == "success") {
                releasedBookInfo.addBook(1);
                (0, displayMenu_1.default)();
            }
            else {
                (0, displayMenu_1.default)();
            }
        }
        if (!this.books.has(titleOfBook)) {
            console.log("Invalid title provided for returning book. ");
            (0, displayMenu_1.default)();
        }
        var releasedBookInfo = this.books.get(titleOfBook);
        input_1.r.question("Please provide your Library Id :- ", function (idOfUser) {
            var Id = parseInt(idOfUser);
            if (_this.usersOfLibrary.has(Id)) {
                var userInfo = _this.usersOfLibrary.get(Id);
                updateReleasedBook(releasedBookInfo, userInfo);
            }
            else {
                input_1.r.question("Provide valid Id for returning the book :- ", function (idOfUser) {
                    var Id = parseInt(idOfUser);
                    if (_this.usersOfLibrary.has(Id)) {
                        var userInfo = _this.usersOfLibrary.get(Id);
                        updateReleasedBook(releasedBookInfo, userInfo);
                    }
                    else {
                        console.log("Process agian ....");
                        (0, displayMenu_1.default)();
                    }
                });
            }
        });
    };
    Library.prototype.listAllBook = function () {
        if (this.books.size == 0) {
            console.log("No Books availble in Library.");
            (0, displayMenu_1.default)();
        }
        else {
            console.log("Availble Books in Library.");
            this.books.forEach(function (values, keys) {
                var bookInfor = values.bookDetails;
                if (values.noOfAvailableBook > 0) {
                    console.log("Title of Book is ".concat(bookInfor.title, " and author is ").concat(bookInfor.author, " and copies availble is ").concat(values.noOfAvailableBook));
                }
            });
            (0, displayMenu_1.default)();
        }
    };
    return Library;
}());
exports.Library = Library;
function updateIssuedBook(checkoutBookInfo, userInfo) {
    if (checkoutBookInfo.noOfAvailableBook > 0) {
        var response = userInfo.borrowBook(checkoutBookInfo.bookDetails);
        if (response == "success") {
            checkoutBookInfo.removeBook(1);
            (0, displayMenu_1.default)();
        }
        else {
            (0, displayMenu_1.default)();
        }
    }
}
