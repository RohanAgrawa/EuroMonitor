import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  public task : string;
  // public data = sharedData;
  public warning : string;

  @Output() public taskAdded = new EventEmitter<{task : string}>()


  onAddTask(){
    if(this.task.length > 0 && this.task.charAt(0) != " "){

      this.taskAdded.emit({task : this.task})
    }
    if(this.task.charAt(0) == " "){
      this.warning = "Please Enter valid non leading white spaces task";
        setTimeout(()=> {
          this.warning = "";
        }, 3000);
    }
    this.task = "";
  }
}
