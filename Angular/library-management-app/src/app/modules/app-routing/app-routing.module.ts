import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';
import { AddAdminComponent } from '../../components/add-user/add-admin/add-admin.component';

const appRoutes: Routes = [
  { path: 'add-user/public', component: AddUserComponent, title: 'Add User' },
  { path: 'add-user/admin', component: AddAdminComponent, title: 'Add Admin'},
  {path : 'users', component: UserDetailsComponent, title: 'User Details'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
