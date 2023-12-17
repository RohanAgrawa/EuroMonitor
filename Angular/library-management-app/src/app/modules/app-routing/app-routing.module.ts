import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from '../../components/users/add-user/add-user.component';
import { UserDetailsComponent } from '../../components/users/user-details/user-details.component';
import { AddAdminComponent } from '../../components/users/add-user/add-admin/add-admin.component';
import { UpdateUserComponent } from '../../components/users/update-user/update-user.component';
import { UpdateAdminUserComponent } from '../../components/users/update-user/update-admin-user/update-admin-user.component';

const appRoutes: Routes = [
  { path: 'add-user/public', component: AddUserComponent, title: 'Add User' },
  { path: 'add-user/admin', component: AddAdminComponent, title: 'Add Admin'},
  {
    path: 'users', component: UserDetailsComponent, title: 'User Details', children: [
      { path: ':id/update', component: UpdateUserComponent, title: 'Update User' },
      {path : ':id/update/admin', component : UpdateAdminUserComponent, title : 'Update Admin'}
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
