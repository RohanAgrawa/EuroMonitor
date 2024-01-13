import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RequestBookService } from "./request-book.service";
import { TestBed } from "@angular/core/testing";
import { BookTransactionModel } from "../models/book-transaction.model";
import { BookModel } from "../models/book.model";
import { UserModel } from "../models/user.model";

describe('RequestBookService', () => {

    let requestBookService: RequestBookService,
        httpTestingController: HttpTestingController;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RequestBookService]
        });
        requestBookService = TestBed.inject(RequestBookService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should request a book from user', () => {

        let user = new UserModel("test", 1234567891, "test@gmail.com", null, null,1);
        let book = new BookModel("testBook", "testAuthor1", "testDescription", "testGenre", "testPublicationYear", "testIsbn", 1);
        let bookTransaction = new BookTransactionModel(book, user, new Date(), new Date(), 'PENDING');
        
        requestBookService.requestBook(bookTransaction).subscribe((data) => {
            expect(data).toEqual(bookTransaction);
            expect(data.book.title).toEqual("testBook");
            expect(data.user.name).toEqual("TEST");
            expect(data.user.phone_no).toEqual(1234567891);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/borrow');
        expect(req.request.method).toEqual('POST');


        let dummyBorrowedBook = {
            book: {
                title: "testBook",
                author: "testAuthor",
                description: "testDescription",
                genre: "testGenre",
                publicationYear: "testPublicationYear",
                isbn: "testIsbn",
                id: 1
            },
            user: {
                phone_no: 1234567891, name: 'TEST', email: 'TEST@GMAIL.COM', id : 1
            },
            issueDate: new Date(),
            returnDate: new Date(),
            id: 1
        };

        req.flush(dummyBorrowedBook);
        
    });
});