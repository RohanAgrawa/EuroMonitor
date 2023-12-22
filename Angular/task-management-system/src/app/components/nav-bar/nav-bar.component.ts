import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{

  public isLoggedIn : boolean = false;

  constructor(private authService: AuthenticationService) { }
  
  public ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
