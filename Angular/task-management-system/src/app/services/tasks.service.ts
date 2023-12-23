import { Injectable } from "@angular/core";
import { TaskModel } from "../models/task.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})
    
export class TaskService{

    private taskUrl: string = 'http://localhost:3000/tasks';

    constructor(private http: HttpClient){}

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

    public getTasks() : Observable<any>{

        const user = JSON.parse(localStorage.getItem('userData'));
        return this.http.get(`${this.taskUrl}?userId=${user.id}`, {
            headers: { 'Authorization': 'Bearer ' +  user.token}
        });
    }

    public deleteTask(id: number) : Observable<any>{
        return this.http.delete(`${this.taskUrl}/${id}`, {
            headers: { 'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('userData')).token}
        });
    }
}