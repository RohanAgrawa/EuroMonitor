import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { DisplayTaskComponent } from './display-task/display-task.component';
import {FormsModule} from "@angular/forms";
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    DisplayTaskComponent,
    CompletedTasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
