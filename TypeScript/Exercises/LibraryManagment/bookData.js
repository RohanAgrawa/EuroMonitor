"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookData = void 0;
var BookData = /** @class */ (function () {
    function BookData(bookDetails, noOfAvailableBook) {
        this.bookDetails = bookDetails;
        this.noOfAvailableBook = noOfAvailableBook;
    }
    BookData.prototype.addBook = function (newBook) {
        this.noOfAvailableBook += newBook;
    };
    BookData.prototype.removeBook = function (removedBook) {
        this.noOfAvailableBook -= removedBook;
    };
    return BookData;
}());
exports.BookData = BookData;
