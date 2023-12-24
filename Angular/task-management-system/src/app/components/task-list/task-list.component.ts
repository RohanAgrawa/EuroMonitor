import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/tasks.service';
import { TaskModel } from '../../models/task.model';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog/dialog-content.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit{

  public displayedColumns: string[] = ['id', 'title', 'category', 'dueDate', 'completionStatus', 'edit', 'delete'];
  public dataSource: MatTableDataSource<TaskModel>;

  public tasks: TaskModel[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private taskService: TaskService, private _liveAnnouncer: LiveAnnouncer, private route : ActivatedRoute, private routes : Router) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => { 
        this.getTasks();
    });
    this.getTasks();
  }

  private getTasks(): void {
    this.taskService.getTasks().subscribe((data : TaskModel[]) => {
      this.tasks = data;
      this.dataSource = new MatTableDataSource<TaskModel>(this.tasks);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: TaskModel, filter: string) => {
        return data.category.toLowerCase().includes(filter);
      }
    });
  }


  public announceSortChange(sortState: Sort) : void{

    if (sortState.direction)
    {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }
    else
    {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public applyFilter(event: Event): void {
    let filteredValue = (event.target as HTMLInputElement).value;
    filteredValue = filteredValue.trim().toLowerCase();
    this.dataSource.filter = filteredValue;
    
  }


  public onDelete(task: any): void {
    this.taskService.deleteTask(task.id).subscribe((response) => {
      this.getTasks();
    }, (error) => {
      this.openDialog();
    });
  }

  public onUpdate(task: any): void {
    this.routes.navigate(['edit-task', task.id], { relativeTo: this.route });
  }
  
  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}
