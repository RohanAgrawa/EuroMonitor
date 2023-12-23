import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule} from '@angular/router';
import { UserLoginComponent } from '../../components/user-login/user-login.component';
import { DashBoardComponent } from '../../components/dash-board/dash-board.component';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';


const appRoutes: Routes = [
  { path: 'login', component: UserLoginComponent, title: 'Login' },
  {
    path: 'dash-board', component: DashBoardComponent, title: 'DashBoard', children: [
      { path: 'add-task', component: AddTaskComponent, title: 'Add Task' },
      {path : 'tasks' , component : TaskListComponent, title : 'Task List'}
  ]}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
