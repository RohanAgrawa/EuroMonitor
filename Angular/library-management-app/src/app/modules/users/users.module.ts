import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailsComponent } from '../../components/users/user-details/user-details.component';
import { AddUserComponent } from '../../components/users/add-user/add-user.component';
import { UpdateUserComponent } from '../../components/users/update-user/update-user.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';


@NgModule({
  declarations: [
    UserDetailsComponent,
    AddUserComponent,
    UpdateUserComponent,
  ],
  imports: [
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    
  ],
  providers : [UserService]
})
export class UsersModule { }
