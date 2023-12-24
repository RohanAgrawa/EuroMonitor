import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/tasks.service';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit{

  @ViewChild('f') public taskForm: NgForm;
  public selectedStatus: string = '';
  public selectedCategory: string = '';

  public query: string;
  public id: string;
  public responseError: boolean = false;


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

  constructor(private route: ActivatedRoute, private taskService: TaskService, private routes: Router) { 
    
  }

  public ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getTask();
      }
    });

  }

  private getTask(): void {
    this.taskService.getTask(+this.id).subscribe((data) => {
      this.responseError = false;
      this.taskForm.setValue({
        title: data.title,
        status: data.completionStatus === false ? 'false' : 'true',
        dueDate: data.dueDate,
        category: data.category
      });
      this.selectedStatus = data.completionStatus === false ? 'false' : 'true';
      this.selectedCategory = data.category;
    }, (error) => {
      this.responseError = true;
      });
  }

  public onUpdateTask(): void {
    const task = new TaskModel(this.taskForm.value.title, this.taskForm.value.status === "false" ? false : true, this.taskForm.value.dueDate, this.taskForm.value.category, JSON.parse(localStorage.getItem('userData')).id);
    this.id = this.id === undefined ? this.taskForm.value.id : this.id;
    this.taskService.updateTask(task, +this.id).subscribe((response) => {
      this.routes.navigate(['dash-board', 'tasks'], { queryParams : {task : 'updated'}, queryParamsHandling : 'merge', fragment :  this.id});
    }, (error) => {
      this.responseError = true;
    });
    this.taskForm.resetForm();
  }
}
