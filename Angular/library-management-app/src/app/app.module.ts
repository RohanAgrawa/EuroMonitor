import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './components/add-user/add-user.component';
import {MaterialModule} from "./modules/material/material.module";
import {FormsModule} from "@angular/forms";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddAdminComponent } from './components/add-user/add-admin/add-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    NavBarComponent,
    DashBoardComponent,
    UserDetailsComponent,
    AddAdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
