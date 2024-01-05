import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from '../../components/dash-board/dash-board.component';
import { AuthenticationComponent } from '../../components/authentication/authentication.component';
import { LoginGuardService } from '../../services/login-guard.service';
import { AuthGuardService } from '../../services/auth-guard.service';
import { PublicComponent } from '../../components/public/public.component';
import { UserDashboardComponent } from '../../components/user-utilities/user-dashboard/user-dashboard.component';

const appRoutes: Routes = [
  { path: 'authentication', component: AuthenticationComponent, title: 'Authentication', canActivate: [LoginGuardService] },
  { path: 'publicAuthentication', component : PublicComponent, title : 'Public Authentication'},
  {
    path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuardService], canActivateChild : [AuthGuardService], title: 'Dashboard', children: [
      { path : '', loadChildren : () => import('../books/books.module').then(m => m.BooksModule)},
  { path: '', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
  { path: '', loadChildren: () => import('../book-transactions/book-transactions.module').then(m => m.BookTransactionsModule) },
    ]
  },
  {
    path: 'public-dashboard', component: UserDashboardComponent, title: 'Public Dashboard', children: [
      { path: '', loadChildren: () => import('../user-utilities/user-utilities.module').then(m => m.UserUtilitiesModule) }
    ]
  },
  {path : '', redirectTo : 'authentication', pathMatch : 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
