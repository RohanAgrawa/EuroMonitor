import { Component } from '@angular/core';
import {TodoModel} from "./todo.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo-App';
  public todoItems : TodoModel[] = [];

  onTaskAdd(event : {task : string}){
    this.todoItems.push(new TodoModel(event.task));
    console.log(this.todoItems);
  }
}
