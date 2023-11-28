import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../Services/data.service";
import {TodoModel} from "../../models/todo.model";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit{

  public task : string;
  public tasks : TodoModel[];

  constructor(private dataService : DataService) {
  }

  ngOnInit() {
    this.tasks = this.dataService.getItems();
  }

  public onAddTask() : void {

    this.dataService.addItems(this.task);

    let resetForm : HTMLFormElement = <HTMLFormElement>document.getElementById("taskForm");
    resetForm.reset()
  }

  public onComplete(index : number) : void{
    this.tasks[index].isCompleted = true;
  }

  public onDelete(index : number) : void{

    this.tasks.splice(index,1);
  }

  public getVisibility(isCompleted : boolean) : string{

    if(isCompleted){
      return "hidden";
    }
    else{
      return "visible";
    }
  }
}
