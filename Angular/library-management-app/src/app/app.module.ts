import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material/material.module";
import {FormsModule} from "@angular/forms";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { PublicComponent } from './components/public/public.component';
import { publicAuthenticationService } from './services/public-authentication.service';
import { BooksComponent } from './components/user-utilities/books/books.component';
import { UserDashboardComponent } from './components/user-utilities/user-dashboard/user-dashboard.component';
import { BorrowedStatusComponent } from './components/user-utilities/borrowed-status/borrowed-status.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashBoardComponent,
    AuthenticationComponent,
    PublicComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, publicAuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
