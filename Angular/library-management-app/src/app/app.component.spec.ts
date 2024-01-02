import { DebugElement } from "@angular/core";
import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./modules/material/material.module";
import { AuthenticationService } from "./services/authentication.service";
import { AppModule } from "./app.module";

describe('AppComponent', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let authServiceSpy: any;
    let el: DebugElement;
    
    beforeEach(waitForAsync(() => {
        const spy = jasmine.createSpyObj('AuthenticationService', ['user', 'logout']);
    
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [MaterialModule, AppModule],
            providers: [{ provide: AuthenticationService, useValue: spy }],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            component = fixture.componentInstance;
            authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
            el = fixture.debugElement;
        });
    }));
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should call autoLogin method of authentication service on ngOnInit', () => {
        waitForAsync(() => {
            component.ngOnInit();
            expect(authServiceSpy.autoLogin).toHaveBeenCalled();
        });
    });

    afterEach(() => {
        fixture.destroy();
    });
});