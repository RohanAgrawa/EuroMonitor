import {Component, Input} from '@angular/core';

import {TodoModel} from "../todo.model";
@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrl: './display-task.component.css'
})

export class DisplayTaskComponent {


  @Input() public tasks : TodoModel[];

  onComplete(index : number) : void{
    this.tasks[index].isCompleted = true;
  }

  onDelete(position : number) : void{

    this.tasks.splice(position,1);
  }
}
