import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from '../../components/users/add-user/add-user.component';
import { UserDetailsComponent } from '../../components/users/user-details/user-details.component';
import { AddAdminComponent } from '../../components/users/add-user/add-admin/add-admin.component';
import { UpdateUserComponent } from '../../components/users/update-user/update-user.component';
import { UpdateAdminUserComponent } from '../../components/users/update-user/update-admin-user/update-admin-user.component';
import { CreateBookCatlogComponent } from '../../components/books/create-book-catlog/create-book-catlog.component';
import { BookDetailsComponent } from '../../components/books/book-details/book-details.component';
import { UpdateBookCatlogComponent } from '../../components/books/update-book-catlog/update-book-catlog.component';
import { IssueBookComponent } from '../../components/book-transactions/issue-book/issue-book.component';
import { ReturnBookComponent } from '../../components/book-transactions/return-book/return-book.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full'},
  { path: 'add-user/public', component: AddUserComponent, title: 'Add User' },
  { path: 'add-user/admin', component: AddAdminComponent, title: 'Add Admin'},
  {
    path: 'users', component: UserDetailsComponent, title: 'User Details', children: [
      { path: ':id/update', component: UpdateUserComponent, title: 'Update User' },
      {path : ':id/update/admin', component : UpdateAdminUserComponent, title : 'Update Admin'}
    ]
  },
  { path: 'create-book', component: CreateBookCatlogComponent, title: 'Create Book' },
  {
    path: 'books', component: BookDetailsComponent, title: 'Book', children: 
      [
        { path: ':id/update', component: UpdateBookCatlogComponent, title: 'Update Book' }
      ]
  },
  { path: 'issue-book', component: IssueBookComponent, title: 'Issue Book' },
  { path : 'return-book', component : ReturnBookComponent, title : 'Return Book'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
