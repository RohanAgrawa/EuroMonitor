import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick, waitForAsync } from "@angular/core/testing";
import { AddUserComponent } from "./add-user.component";
import { DebugElement, NO_ERRORS_SCHEMA, ViewChild } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { of, throwError } from "rxjs";
import { UserModel } from "../../../models/user.model";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { UserDetailsComponent } from "../user-details/user-details.component";

describe('AddUserComponent', () => {

    let component: AddUserComponent;
    let userServiceSpy: any;
    let el: DebugElement;
    let fixture: ComponentFixture<AddUserComponent>;

    beforeEach(waitForAsync(() => {

        const spy = jasmine.createSpyObj('UserService', ['addUser']);

        TestBed.configureTestingModule({
            declarations: [AddUserComponent],
            imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, RouterTestingModule.withRoutes([
                { path: 'dashboard/users', component: UserDetailsComponent }
            ])],
            providers: [{ provide: UserService, useValue: spy }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AddUserComponent);
            component = fixture.componentInstance;
            userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
            el = fixture.debugElement;
        });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call userService.addUser when onSubmit is called and reset the form on success', fakeAsync(() => {
        // Arrange
        const mockUserData = { id: '123', name: 'TEST', phone_no: 1234567890, email: 'TEST@GMAIL.COM', role: 'PUBLIC'};
        userServiceSpy.addUser.and.returnValue(of(mockUserData));
        
        fixture.detectChanges();
        
        Promise.resolve().then(() => {
            if (component.userForm) {
                component.userForm.form.setValue({
                    username: 'TEST',
                    mobile: 1234567890,
                    email: 'Test@gmail.com',
                });
                spyOn(component.userForm, 'resetForm');
            }
            component.onsubmit();
        });

        flushMicrotasks();

        fixture.detectChanges();
        expect(userServiceSpy.addUser).toHaveBeenCalledOnceWith(jasmine.any(UserModel));
        expect(component.isSubmitted).toBeTrue();
        expect(component.isSubmittedError).toBeFalse();
        expect(component.publicUserId).toBe(mockUserData.id);
        expect(component.userForm.resetForm).toHaveBeenCalled();
      }));
    
      it('should set isSubmittedError to true on error', fakeAsync(() => {
        // Arrange
          userServiceSpy.addUser.and.returnValue(throwError('Fake error'));
          
        
          fixture.detectChanges();

          Promise.resolve().then(() => {
            if (component.userForm) {
                component.userForm.form.setValue({
                    username: 'TEST',
                    mobile: 1234567890,
                    email: 'Test@gmail.com',
                });
                spyOn(component.userForm, 'resetForm');
              }
              component.onsubmit();
          });
        flushMicrotasks();
          
        fixture.detectChanges();
    
        // Assert
        expect(userServiceSpy.addUser).toHaveBeenCalledOnceWith(jasmine.any(UserModel));
        expect(component.isSubmitted).toBeTrue();
        expect(component.isSubmittedError).toBeTrue();
        expect(component.publicUserId).toBe('');
          expect(component.userForm.resetForm).not.toHaveBeenCalled();

      }));
});