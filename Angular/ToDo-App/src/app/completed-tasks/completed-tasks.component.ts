import { Component } from '@angular/core';
import sharedData from "../Shared/data";
import {TodoModel} from "../todo.model";

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css'
})
export class CompletedTasksComponent {
  public tasks = sharedData.todoItems;

  onDelete(position : number) : void{

    this.tasks.splice(position,1);
  }
}

