import { Injectable } from "@angular/core";
import { TaskModel } from "../models/task.model";
@Injectable({
    providedIn : 'root'
})
    
export class TaskService{

    private taskUrl: string = 'http://localhost:3000/tasks';
    public addTask(task: TaskModel): Promise<Response> {
        const response = fetch(this.taskUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
            },
            body: JSON.stringify(task)
        });
        return response;
    }
}