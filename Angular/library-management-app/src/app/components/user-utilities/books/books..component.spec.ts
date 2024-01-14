import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { BookService } from "../../../services/book.service";
import { RequestBookService } from "../../../services/request-book.service";
import { BooksComponent } from "./books.component";
import { MaterialModule } from "../../../modules/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

describe('BooksComponent', () => {

    let component: BooksComponent;
    let fixture: ComponentFixture<BooksComponent>;
    let bookService: any;
    let requestBookService: any;
    let dialog: MatDialog;
    let router: Router;
    let route: ActivatedRoute;

    beforeEach(waitForAsync(() => {

        const bookServiceSpy = jasmine.createSpyObj('BookService', ['getBooks']);
        const requestBookServiceSpy = jasmine.createSpyObj('RequestBookService', ['requestBook', 'getBorrowedBooks']);
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        TestBed.configureTestingModule({
            declarations: [BooksComponent],
            imports :[MaterialModule, RouterTestingModule.withRoutes([]), HttpClientTestingModule, RouterTestingModule],
            providers: [
                { provide: BookService, useValue: bookServiceSpy },
                { provide: RequestBookService, useValue: requestBookServiceSpy },
                { provide: MatDialog, useValue: dialogSpy },
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(BooksComponent);
            component = fixture.componentInstance;
            bookService = TestBed.inject(BookService);
            requestBookService = TestBed.inject(RequestBookService);
            dialog = TestBed.inject(MatDialog);
            localStorage.setItem('publicData', JSON.stringify([{
                "phone_no": "1234567891",
                "name": "SOMIL SHARMA",
                "email": "SOMIL@GMAIL.COM",
                "id": 1
            }]));
        });
    }));

    it('should create', () => {

        expect(component).toBeTruthy();
    });

    it('should fetch books on ngOnInit', () => {
        
        const books = [
            {
                "title": "DATA STRUCTURES & ALGORITHMS",
                "author": "NARASIMBHA KARUMANCHI",
                "description": "BEST BOOK LEARNING ALOGRITHMS, THIS BOOK IS WIRTTEN BY IIT BOMBAY GRADUATE.",
                "genre": "OTHER",
                "publicationYear": "2000",
                "isbn": "978-93-560-6066-1",
                "id": 1
              },
              {
                "title": "JAVA",
                "author": "SOMIL",
                "description": "JAVA BOOK",
                "genre": "NOVEL",
                "publicationYear": "2024",
                "isbn": "978-93-560-6066-1",
                "id": 2
              },
              {
                "title": "THE INTELLEGNET INVESTOR",
                "author": "WARREN BUFFET",
                "description": "ADVICE ON STOCK MARKET",
                "genre": "FICTION",
                "publicationYear": "2000",
                "isbn": "978-93-560-6066-1",
                "id": 3
              }
        ]

        bookService.getBooks.and.returnValue(of(books));

        component.ngOnInit();


        expect(component.books.length).toBe(3)
        expect(component.dataSource.data.length).toBe(3);
    });


    it('should request book on onBorrow', () => {

        const mockResponse = {
            "book": {
              "title": "DATA STRUCTURES & ALGORITHMS",
              "author": "NARASIMBHA KARUMANCHI",
              "description": "BEST BOOK LEARNING ALOGRITHMS, THIS BOOK IS WIRTTEN BY IIT BOMBAY GRADUATE.",
              "genre": "OTHER",
              "publicationYear": "2000",
              "isbn": "978-93-560-6066-1",
              "id": 1
            },
            "user": {
              "phone_no": "1234567891",
              "name": "SOMIL SHARMA",
              "email": "SOMIL@GMAIL.COM",
              "password": null,
              "id": 1
            },
            "issueDate": "2024-01-06T11:26:45.254Z",
            "returnDate": "2024-01-16T11:26:45.254Z",
            "status": "APPROVED",
            "id": 1
        }
        requestBookService.getBorrowedBooks.and.returnValue(of([]));

       requestBookService.requestBook.and.returnValue(of(mockResponse));

        const book = 
            {
                "title": "DATA STRUCTURES & ALGORITHMS",
                "author": "NARASIMBHA KARUMANCHI",
                "description": "BEST BOOK LEARNING ALOGRITHMS, THIS BOOK IS WIRTTEN BY IIT BOMBAY GRADUATE.",
                "genre": "OTHER",
                "publicationYear": "2000",
                "isbn": "978-93-560-6066-1",
                "id": 1
              }
        
        
        
        component.onBorrow(book);
              
        expect(requestBookService.getBorrowedBooks).toHaveBeenCalled();
        expect(requestBookService.requestBook).toHaveBeenCalled();

    });

    afterEach(() => {
        localStorage.removeItem('publicData');
    });
});