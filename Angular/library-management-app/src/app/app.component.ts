import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { publicAuthenticationService } from './services/public-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authenticateService: AuthenticationService, private publicAuthService : publicAuthenticationService) { }

  public ngOnInit(): void {
    this.authenticateService.autoLogin();
    this.publicAuthService.autoLogin();
  }


}
