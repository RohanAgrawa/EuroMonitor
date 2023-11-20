import { Component } from '@angular/core';
import sharedData from "../Shared/data";
@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrl: './display-task.component.css'
})

export class DisplayTaskComponent {
  public tasks = sharedData.todoItems;
  onComplete(index : number) : void{
    this.tasks[index].isCompleted = true;
  }

  onDelete(position : number) : void{

    this.tasks.splice(position,1);
  }
}
