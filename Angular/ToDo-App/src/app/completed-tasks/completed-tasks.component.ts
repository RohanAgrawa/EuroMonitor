import {Component, Input} from '@angular/core';
import {TodoModel} from "../todo.model";

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css'
})
export class CompletedTasksComponent {


  @Input() public tasks : TodoModel[];
  onDelete(position : number) : void{

    this.tasks.splice(position,1);
  }
}

