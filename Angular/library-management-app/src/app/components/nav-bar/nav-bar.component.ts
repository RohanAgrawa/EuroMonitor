import { Component, Output } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { publicAuthenticationService } from '../../services/public-authentication.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  public isLoggedIn: boolean = false;


  constructor(private authService: AuthenticationService, private publicAuthService : publicAuthenticationService) { }
  
  public ngOnInit(): void {
    
    if (!this.isLoggedIn) {
      Promise.resolve().then(() => this.checkUser()).then((value) => { if (!value) { this.checkAdmin() } }
      );
    }
    
  }

  public onLogout(): void {
    this.authService.logout();
    this.publicAuthService.logout();
  }

  public checkUser(): boolean{
    this.publicAuthService.publicUser.subscribe((user) => {
       
      if (user) {
        this.isLoggedIn = true;

      }
      else {
        this.isLoggedIn = false;
      }
    });

    return this.isLoggedIn;
  }

  public checkAdmin(): void {
    
      this.authService.user.subscribe((user) => {
       
        if (user) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
      });
    
  }
}
