import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks, waitForAsync } from "@angular/core/testing";
import { UpdateUserComponent } from "./update-user.component";
import { UserService } from "../../../services/user.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from "@angular/router";
import { MaterialModule } from "../../../modules/material/material.module";
import { of } from "rxjs";


describe('UpdateUserComponent', () => {

    let component: UpdateUserComponent;
    let userServiceSpy: any;
    let el: DebugElement;
    let fixture: ComponentFixture<UpdateUserComponent>;
    let dialog: jasmine.SpyObj<MatDialog>;

    beforeEach(waitForAsync(() => {
            
        const spy = jasmine.createSpyObj('UserService', ['updateUser']);
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    
            TestBed.configureTestingModule({
                declarations: [UpdateUserComponent],
                imports: [FormsModule, HttpClientTestingModule, MaterialModule, RouterTestingModule],
                providers: [{ provide: UserService, useValue: spy },
                    { provide: MatDialog, useValue: dialogSpy },
                    { provide: ActivatedRoute, useValue: { snapshot: { queryParams: { userType: 'public' } } } },
                    { provide : Router, useValue : { navigate : jasmine.createSpy('navigate')} }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(UpdateUserComponent);
                component = fixture.componentInstance;
                userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
                el = fixture.debugElement;
                dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
            });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch user data on ngOnInit', fakeAsync(() => {
        const userData = {id : 1, name: 'John Doe', email: 'john.doe@example.com', phone_no: '1234567890' };
        
    
        Promise.resolve().then(() => {
            userServiceSpy.updateUser.and.returnValue(of(userData));
            
        });
        fixture.detectChanges();
        flushMicrotasks();
        component.ngOnInit();
        fixture.detectChanges();
        expect(userServiceSpy.getUser).toHaveBeenCalledWith(1);
        expect(component.userForm.value.username).toBe(userData.name);
        expect(component.userForm.value.email).toBe(userData.email);
        expect(component.userForm.value.mobile).toBe(userData.phone_no);
      }));

});