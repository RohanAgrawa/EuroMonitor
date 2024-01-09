import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, waitForAsync } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { AuthenticationService } from '../../services/authentication.service';
import { of } from 'rxjs';
import { UserResponseModel } from '../../models/userResponse.model';
import { MaterialModule } from '../../modules/material/material.module';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { publicAuthenticationService } from '../../services/public-authentication.service';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let authServiceSpy: any;
  let publicAuthServiceSpy: any;
    let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('AuthenticationService', ['logout']);
    const publicSpy = jasmine.createSpyObj('publicAuthenticationService', ['logout']);

    TestBed.configureTestingModule({
        declarations: [NavBarComponent],
        imports: [MaterialModule],
      providers: [{ provide: AuthenticationService, useValue: spy }, { provide: publicAuthenticationService, useValue: publicSpy }],
      schemas : [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
      authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
      publicAuthServiceSpy = TestBed.inject(publicAuthenticationService) as jasmine.SpyObj<publicAuthenticationService>;
        el = fixture.debugElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLoggedIn to true when user is logged in', fakeAsync(() => {

      
    const userResponse = new UserResponseModel(1, "testName", 1234567891 , "test@gmail.com", "ADMIN", "accessToken", new Date());
    const mockUser = userResponse;
    

    Promise.resolve().then(() => {
      authServiceSpy.user = of(mockUser);
      publicAuthServiceSpy.publicUser = of(mockUser);

      return true;
    }).then((value) => {
      if (value) {
        component.checkUser();
        return true;
      }
      return false;
    }).then((value) => { if(!value){component.checkAdmin()} });

    

    flushMicrotasks();
    fixture.detectChanges();
    expect(component.isLoggedIn).toBeTrue();
    const active = el.query(By.css('.active'));
    expect(active).toBeNull();
          
  }));

  it('should initialize isLoggedIn to false when user is not logged in', fakeAsync(() => {

      Promise.resolve().then(() => {
        authServiceSpy.user = of(null);
        publicAuthServiceSpy.publicUser = of(null);
      });
      flushMicrotasks();
    fixture.detectChanges();
      expect(component.isLoggedIn).toBeFalse();
  }));

  it('should call authService.logout() on logout', () => {
    component.onLogout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(publicAuthServiceSpy.logout).toHaveBeenCalled();
        
  });
    
  afterEach(() => {
    fixture.destroy();
    });
});
