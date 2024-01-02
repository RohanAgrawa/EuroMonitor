import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { AuthenticationService } from '../../services/authentication.service';
import { of } from 'rxjs';
import { UserResponseModel } from '../../models/userResponse.model';
import { MaterialModule } from '../../modules/material/material.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
    let authServiceSpy: any;
    let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('AuthenticationService', ['user', 'logout']);

    TestBed.configureTestingModule({
        declarations: [NavBarComponent],
        imports: [MaterialModule],
      providers: [{ provide: AuthenticationService, useValue: spy }],
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
        el = fixture.debugElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLoggedIn to true when user is logged in', () => {

      
    const userResponse = new UserResponseModel(1, "testName", 1234567891 , "test@gmail.com", "ADMIN", "accessToken", new Date());
    const mockUser = userResponse;
    authServiceSpy.user.and.returnValue(of(mockUser)) ;

      waitForAsync(() => {
          component.ngOnInit();
          expect(component.isLoggedIn).toBeTrue();
          const active = el.query(By.css('.active'));
          expect(active).toBeNull();
    })      
  });

  it('should initialize isLoggedIn to false when user is not logged in', () => {
    authServiceSpy.user.and.returnValue(of(null));

      waitForAsync(() => {
          component.ngOnInit();
          expect(component.isLoggedIn).toBeFalse();
          const active = el.queryAll(By.css('.active'));
          expect(active.length).toEqual(1);
      });

  });

  it('should call authService.logout() on logout', () => {
    component.onLogout();

      expect(authServiceSpy.logout).toHaveBeenCalled();
        
  });
    
  afterEach(() => {
    fixture.destroy();
    });
});
