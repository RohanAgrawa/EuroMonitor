import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule} from '@angular/router';
import { UserLoginComponent } from '../../components/user-login/user-login.component';
import { DashBoardComponent } from '../../components/dash-board/dash-board.component';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { EditTaskComponent } from '../../components/edit-task/edit-task.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { LoginGuardService } from '../../services/login-guard.service';


const appRoutes: Routes = [
  { path: 'login', component: UserLoginComponent, canActivate : [LoginGuardService], title: 'Login' },
  {
    path: 'dash-board', component: DashBoardComponent, canActivate : [AuthGuardService], canActivateChild : [AuthGuardService] , title: 'DashBoard', children: [
      { path: 'add-task', component: AddTaskComponent, title: 'Add Task' },
      {
        path: 'tasks', component: TaskListComponent, title: 'Task List', children: [
          { path: 'edit-task/:id', component: EditTaskComponent, title: 'Edit Task' }
        ]
      },
      {path : 'edit-task', component : EditTaskComponent, title : 'Edit Task'},
      {path : '', redirectTo : 'tasks', pathMatch : 'full'}
  ]}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
