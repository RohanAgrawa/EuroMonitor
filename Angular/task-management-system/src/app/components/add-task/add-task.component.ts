import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskModel } from '../../models/task.model';
import { TaskService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  @ViewChild('f') taskAddForm: NgForm;
  public isSubmitted: boolean = false;
  public isSubmittedError: boolean = false;
  public selectedStatus: string = '';
  public selectedCategory: string = '';
  public dueDate: Date;
  
  public completionStatus = [
    { completionStatus: 'Completed', value: 'true' },
    { completionStatus: 'Not Completed', value: 'false' }
  ];

  public categories = [
    { key: 'Work', value: 'work' },
    { key: 'Personal', value: 'personal' },
    { key: 'Shopping', value: 'shopping' },
    { key: 'Others', value: 'others' }
  ];

  constructor(private taskService : TaskService) { }

  public onAddTask(): void{
    
    const task = new TaskModel(this.taskAddForm.value.title, this.taskAddForm.value.status === "false" ? false : true, this.taskAddForm.value.dueDate, this.taskAddForm.value.category, JSON.parse(localStorage.getItem('userData')).id);

    this.taskService.addTask(task).then((response) => {
      if (response.ok) {
        this.isSubmittedError = false;
      }
      else {
        this.isSubmittedError = true;
      }
      this.isSubmitted = true;
      this.taskAddForm.resetForm();
    });
  }
}
