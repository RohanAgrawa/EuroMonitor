"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookUser = void 0;
var BookUser = /** @class */ (function () {
    function BookUser(name) {
        this.name = name;
        var randomId = Math.random() * 10;
        this.id = Math.round(randomId);
        this.issuedBooks = new Map();
    }
    BookUser.prototype.borrowBook = function (borrowedBook) {
        if (this.issuedBooks.size < 3) {
            this.issuedBooks.set(borrowedBook.title, borrowedBook);
            return "success";
        }
        else {
            console.log("Your Book issue limit already reached to 3 no more books are allowed to checkout.");
            return "failed";
        }
    };
    BookUser.prototype.releaseBook = function (releasedBook) {
        if (this.issuedBooks.has(releasedBook.title)) {
            this.issuedBooks.delete(releasedBook.title);
            return "success";
        }
        else {
            console.log("Give valid title to realse the book");
            return "failed";
        }
    };
    return BookUser;
}());
exports.BookUser = BookUser;
