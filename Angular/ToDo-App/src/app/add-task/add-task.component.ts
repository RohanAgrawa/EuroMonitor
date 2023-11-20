import { Component } from '@angular/core';
import sharedData from '../Shared/data'
import {TodoModel} from "../todo.model";
import data from "../Shared/data";
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  public task : string;
  public data = sharedData;
  public warning : string;
  addTask(event : Event){
    this.task = (<HTMLInputElement>event.target).value;
  }

  onAddTask(){
    if(this.task.length > 0 && this.task.charAt(0) != " "){
      data.todoItems.push(new TodoModel(this.task, data.todoItems.length));
      console.log(sharedData.todoItems)
    }

    if(this.task.charAt(0) == " "){
      this.warning = "Please Enter valid non leading white spaces task";
      setTimeout(()=>{
        this.warning = "";
      }, 3000);
    }
    this.task = "";
  }
}
