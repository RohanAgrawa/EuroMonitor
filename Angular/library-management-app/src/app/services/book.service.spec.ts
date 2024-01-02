import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from "@angular/core/testing";
import { BookModel } from "../models/book.model";

describe('BookService', () => {
  
    let bookService: BookService,
        httpTestingController: HttpTestingController;
    
    beforeEach(() => {  
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookService]
        });
        bookService = TestBed.inject(BookService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });
    
    it('should add book', () => {
    
        let book = new BookModel("testBook", "testAuthor", "testDescription", "testGenre", "testPublicationYear", "testIsbn");

        bookService.addBook(book).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.title).toEqual("testBook");
            expect(response.author).toEqual("testAuthor");
        });

        const req = httpTestingController.expectOne('http://localhost:3000/books');
        expect(req.request.method).toEqual('POST');
        expect(req.request.headers).toBeTruthy();
        
        let dummyBook = {
            title: "testBook",
            author: "testAuthor",
            description: "testDescription",
            genre: "testGenre",
            publicationYear: "testPublicationYear",
            isbn: "testIsbn",
            id: 1
        };
        req.flush(dummyBook);
    });

    it('should update book', () => {
        
            let book = new BookModel("testBook", "testAuthor1", "testDescription", "testGenre", "testPublicationYear", "testIsbn");
    
            bookService.updateBook(1, book).subscribe((response) => {
                expect(response).toBeTruthy();
                expect(response.id).toEqual(1);
            });
    
            const req = httpTestingController.expectOne('http://localhost:3000/books/1');
            expect(req.request.method).toEqual('PUT');
            expect(req.request.headers).toBeTruthy();
            
            let dummyUpdatedBook = {
                title: "testBook",
                author: "testAuthor1",
                description: "testDescription",
                genre: "testGenre",
                publicationYear: "testPublicationYear",
                isbn: "testIsbn",
                id: 1
        };
            req.flush(dummyUpdatedBook);
    });
    
    it('should return all books', () => {

        bookService.getBooks().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.length).toEqual(3);
            });
    
            const req = httpTestingController.expectOne('http://localhost:3000/books');
            expect(req.request.method).toEqual('GET');
            expect(req.request.headers).toBeTruthy();
        
        const books = [
            {
                "title": "testBook1",
                "author": "testAuthor1",
                "description": "testDescription1",
                "genre": "testGenre1",
                "publicationYear": "testPublicationYear1",
                "isbn": "testIsbn1",
                "id": 1
              },
              {
                "title": "testBook2",
                "author": "testAuthor2",
                "description": "testDescription2",
                "genre": "testGenre2",
                "publicationYear": "testPublicationYear2",
                "isbn": "testIsbn2",
                "id": 2
              },
              {
                "title": "testBook3",
                "author": "testAuthor3",
                "description": "testDescription3",
                "genre": "testGenre3",
                "publicationYear": "testPublicationYear3",
                "isbn": "testIsbn3",
                "id": 3
              }
        ];
        
        req.flush(books);
    });

    it('should return book by id', () => {
            
        bookService.getBook(1).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.id).toEqual(1);
        });
        
        const req = httpTestingController.expectOne('http://localhost:3000/books/1');
        expect(req.request.method).toEqual('GET');
        expect(req.request.headers).toBeTruthy();
            
        const books = [
            {
                "title": "testBook",
                "author": "testAuthor",
                "description": "testDescription",
                "genre": "testGenre",
                "publicationYear": "testPublicationYear",
                "isbn": "testIsbn",
                "id": 1
            },
                {
                    "title": "testBook",
                    "author": "testAuthor",
                    "description": "testDescription",
                    "genre": "testGenre",
                    "publicationYear": "testPublicationYear",
                    "isbn": "testIsbn",
                    "id": 2
                }
            ];
    
        req.flush(books[0]);
    });

    it('should remove book by id', () => {
            
        bookService.removeBook(1).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        
        const req = httpTestingController.expectOne('http://localhost:3000/books/1');
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.headers).toBeTruthy();
            
        const books = [
            {
                "title": "testBook",
                "author": "testAuthor",
                "description": "testDescription",
                "genre": "testGenre",
                "publicationYear": "testPublicationYear",
                "isbn": "testIsbn",
                "id": 1
            },
                {
                    "title": "testBook",
                    "author": "testAuthor",
                    "description": "testDescription",
                    "genre": "testGenre",
                    "publicationYear": "testPublicationYear",
                    "isbn": "testIsbn",
                    "id": 2
                }
            ];
    
        req.flush(books[0], {status: 200, statusText: 'OK'});
    });

    afterEach(() => {
        httpTestingController.verify();
    });
})
