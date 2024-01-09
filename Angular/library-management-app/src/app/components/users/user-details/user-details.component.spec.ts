import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { UserDetailsComponent } from "./user-details.component";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "../../../modules/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('UserDetailsComponent', () => {

    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;
    let el: DebugElement;
    let userServiceSpy: any;
    let dialog: jasmine.SpyObj<MatDialog>;
    
    beforeEach(waitForAsync(() => {
        
        const userSpy = jasmine.createSpyObj('UserService', ['getUsers']);
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  

        TestBed.configureTestingModule({
            declarations: [UserDetailsComponent],
            imports : [HttpClientTestingModule, MaterialModule, RouterTestingModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
            providers: [
                { provide: UserService, useValue: userSpy },
                { provide: MatDialog, useValue: dialogSpy },
                { provide: ActivatedRoute, useValue: { queryParams: of({ userType: 'public' }) } },
              
            ],
            schemas : [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(UserDetailsComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
            dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    
        });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch users on ngOnInit', () => {

        const publicUsers = [
            {
                "phone_no": "9111564120",
                "name": "ARVIND JAIN",
                "email": "ARVIND@GMAIL.COM",
                "id": 1
              },
              {
                "phone_no": "6260109311",
                "name": "ROHAN AGRAWAL",
                "email": "ROHAN.AGRAWAL@GMAIL.COM",
                "id": 2
              },
              {
                "phone_no": "4567891234",
                "name": "AKSHAT BHAWSAR",
                "email": "AKSHAT.BHAWSAR@GMAIL.COM",
                "id": 3
              }
        ];

       
        
        userServiceSpy.getUsers.and.returnValue(of(publicUsers));
        fixture.detectChanges();
        expect(userServiceSpy.getUsers).toHaveBeenCalled();
        expect(component.users.length).toBe(3);
        expect(component.dataSource.data.length).toBe(3);
      
    });

    
});