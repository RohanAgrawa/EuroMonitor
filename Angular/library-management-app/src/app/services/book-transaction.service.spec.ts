import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { BookTransactionModel } from "../models/book-transaction.model";
import { BookTransactionService } from "./book-transaction.service";
import { UserModel } from "../models/user.model";
import { BookModel } from "../models/book.model";


describe('BookTransactionService', () => {

    let bookTransactionService: BookTransactionService,
        httpTestingController: HttpTestingController;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookTransactionService]
        });
        bookTransactionService = TestBed.inject(BookTransactionService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });
    
    it('should borrow book from library', () => {

        let user = new UserModel("test", 1234567891, "test@gmail.com", null, null,1);
        let book = new BookModel("testBook", "testAuthor1", "testDescription", "testGenre", "testPublicationYear", "testIsbn", 1);
            let bookTransaction = new BookTransactionModel(book, user, new Date(), new Date());
    
            bookTransactionService.borrowBook(bookTransaction).subscribe((response) => {
                expect(response).toBeTruthy();
                expect(response.book.title).toEqual("testBook");
                expect(response.user.name).toEqual("TEST");
                expect(response.user.email).toEqual("TEST@GMAIL.COM");
            });
    
            const req = httpTestingController.expectOne('http://localhost:3000/borrow');
            expect(req.request.method).toEqual('POST');
            expect(req.request.headers).toBeTruthy();
    
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

    it('should return book to library', () => {
        
        bookTransactionService.returnBook(1, 3, 1).subscribe((response) => {
            expect(response).toBeTruthy();
        });

        const req = httpTestingController.expectOne('http://localhost:3000/borrow/1?book.id=3&user.id=1');
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.headers).toBeTruthy();

        let borrow = [
            {
                "book": {
                    "title": "LAZY",
                    "author": "ROHAN",
                    "description": "LIFE IS LAZY",
                    "genre": "FICTION",
                    "isbn": "978-93-560-6066-4",
                    "id": 3
                },
                "user": {
                    "phone_no": "9111564120",
                    "name": "ARVIND",
                    "email": "ARVIND@GMAIL.COM",
                    "password": null,
                    "id": 1
                },
                "issueDate": "2023-12-20T18:30:00.000Z",
                "returnDate": "2023-12-30T18:30:00.000Z",
                "id": 1
            },
            {
                "book": {
                    "title": "JAVA",
                    "author": "ROHAN",
                    "description": "JAVA",
                    "genre": "NOVEL",
                    "isbn": "978-63-560-6066-1",
                    "id": 4
                },
                "user": {
                    "phone_no": "6260109310",
                    "name": "ROHAN",
                    "email": "ROHAN.AGRAWAL@GMAIL.COM",
                    "password": null,
                    "id": 2
                },
                "issueDate": "2023-12-27T18:30:00.000Z",
                "returnDate": "2023-12-18T18:30:00.000Z",
                "id": 2
            },
            {
                "book": {
                    "title": "JAVA",
                    "author": "ROHAN",
                    "description": "JAVA",
                    "genre": "NOVEL",
                    "isbn": "978-63-560-6066-1",
                    "id": 4
                },
                "user": {
                    "phone_no": "6260109311",
                    "name": "ROHAN",
                    "email": "ROHAN.AGRAWAL@GMAIL.COM",
                    "password": null,
                    "id": 2
                },
                "issueDate": "2023-12-02T18:30:00.000Z",
                "returnDate": "2024-01-17T18:30:00.000Z",
                "id": 3
            }
        ];

        req.flush(borrow[0], {status: 200, statusText: 'OK'});

    });

    it('should get all issued books which are not returned to library', () => {

        bookTransactionService.getIssuedBooks().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.length).toEqual(3);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/borrow');
        expect(req.request.method).toEqual('GET');
        expect(req.request.headers).toBeTruthy();

        let borrow = [
            {
                "book": {
                  "title": "LAZY",
                  "author": "ROHAN",
                  "description": "LIFE IS LAZY",
                  "genre": "FICTION",
                  "isbn": "978-93-560-6066-4",
                  "id": 3
                },
                "user": {
                  "phone_no": "9111564120",
                  "name": "ARVIND",
                  "email": "ARVIND@GMAIL.COM",
                  "password": null,
                  "id": 1
                },
                "issueDate": "2023-12-20T18:30:00.000Z",
                "returnDate": "2023-12-30T18:30:00.000Z",
                "id": 1
              },
              {
                "book": {
                  "title": "JAVA",
                  "author": "ROHAN",
                  "description": "JAVA",
                  "genre": "NOVEL",
                  "isbn": "978-63-560-6066-1",
                  "id": 4
                },
                "user": {
                  "phone_no": "6260109310",
                  "name": "ROHAN",
                  "email": "ROHAN.AGRAWAL@GMAIL.COM",
                  "password": null,
                  "id": 2
                },
                "issueDate": "2023-12-27T18:30:00.000Z",
                "returnDate": "2023-12-18T18:30:00.000Z",
                "id": 2
              },
              {
                "book": {
                  "title": "JAVA",
                  "author": "ROHAN",
                  "description": "JAVA",
                  "genre": "NOVEL",
                  "isbn": "978-63-560-6066-1",
                  "id": 4
                },
                "user": {
                  "phone_no": "6260109311",
                  "name": "ROHAN",
                  "email": "ROHAN.AGRAWAL@GMAIL.COM",
                  "password": null,
                  "id": 2
                },
                "issueDate": "2023-12-02T18:30:00.000Z",
                "returnDate": "2024-01-17T18:30:00.000Z",
                "id": 3
            }
        ];
        req.flush(borrow, {status: 200, statusText: 'OK'});
    });
});