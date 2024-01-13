import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from '../../components/users/user-details/user-details.component';
import { UpdateUserComponent } from '../../components/users/update-user/update-user.component';
import { AddUserComponent } from '../../components/users/add-user/add-user.component';
const routes: Routes = [
    {
        path: 'users', component: UserDetailsComponent, title: 'User Details', children: [
        { path: ':id/update', component: UpdateUserComponent, title: 'Update User' },
        { path: 'addUser', component: AddUserComponent, title: 'Add User' }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }