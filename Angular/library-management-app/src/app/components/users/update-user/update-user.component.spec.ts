import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks, waitForAsync } from "@angular/core/testing";
import { UpdateUserComponent } from "./update-user.component";
import { UserService } from "../../../services/user.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from "@angular/router";
import { MaterialModule } from "../../../modules/material/material.module";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe('UpdateUserComponent', () => {

    let component: UpdateUserComponent;
    let userServiceSpy: any;
    let el: DebugElement;
    let fixture: ComponentFixture<UpdateUserComponent>;
    let dialog: jasmine.SpyObj<MatDialog>;
    let routes: jasmine.SpyObj<ActivatedRoute>;
    const userData = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone_no: '1234567890' };
    beforeEach(waitForAsync(() => {
            
        const spy = jasmine.createSpyObj('UserService', ['updateUser', 'getUser']);
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
      
    
            TestBed.configureTestingModule({
                declarations: [UpdateUserComponent],
                imports: [FormsModule, HttpClientTestingModule, MaterialModule, RouterTestingModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([])],
                providers: [{ provide: UserService, useValue: spy },
                    { provide: MatDialog, useValue: dialogSpy },
                    { provide: ActivatedRoute, useValue: { params: of({ id: '1' }), snapshot: { queryParams: { userType: 'public' } } } },
                    { provide : Router, useValue : { navigate : jasmine.createSpy('navigate')} }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(UpdateUserComponent);
                component = fixture.componentInstance;
                userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
                el = fixture.debugElement;
                dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
                routes = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
                
               
            });
            
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch user data on ngOnInit', fakeAsync(() => {
        
        userServiceSpy.getUser.and.returnValue(of(userData));
        fixture.detectChanges();
        flush();
        Promise.resolve().then(() => {
            component.ngOnInit();
        });
        flushMicrotasks();
        fixture.detectChanges();
        
        expect(userServiceSpy.getUser).toHaveBeenCalledWith(1);
        expect(component.userForm.value.username).toBe(userData.name);
        expect(component.userForm.value.email).toBe(userData.email);
        expect(component.userForm.value.mobile).toBe(userData.phone_no);
      }));

});