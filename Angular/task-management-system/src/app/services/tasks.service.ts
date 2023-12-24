import { Injectable } from "@angular/core";
import { TaskModel } from "../models/task.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn : 'root'
})
    
export class TaskService{

    private taskUrl: string = 'http://localhost:3000/tasks';

    constructor(private http: HttpClient){}

    public addTask(task: TaskModel): Observable<any> {

        return this.http.post<any>(this.taskUrl, task, {
            headers: { 'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('userData')).token}
        });
    }

    public getTasks() : Observable<any>{

        const user = JSON.parse(localStorage.getItem('userData'));
        return this.http.get(`${this.taskUrl}?userId=${user.id}`, {
            headers: { 'Authorization': 'Bearer ' +  user.token}
        });
    }

    public getTask(id: number): Observable<any> {
        
        return this.http.get(`${this.taskUrl}/${id}`, {
            headers: { 'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('userData')).token}
        });
    }

    public deleteTask(id: number) : Observable<any>{
        return this.http.delete(`${this.taskUrl}/${id}`, {
            headers: { 'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('userData')).token}
        });
    }

    public updateTask(task: TaskModel, id : number): Observable<any> {
        return this.http.put(`${this.taskUrl}/${id}`, task, {
            headers: { 'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('userData')).token}
        });
    }
}