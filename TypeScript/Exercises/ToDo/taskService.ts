import { Task } from "./task";

export class TaskService{

    private tasks: Task[] = [];

    public addTask(title: string, description: string) : void{
        
        this.tasks.push(new Task(title, description));
        console.log("Task Added succesfully");
    }

    public getTasks(): void{
        
        let index = 0;

        if (this.tasks.length === 0) {
            console.log("No tasks is present. ");
        }
        else {
            console.log();
            console.log("id || title || description || status ");

            this.tasks.forEach(element => {
                console.log(`${index} || ${element.title} || ${element.description} || ${element.getCompletionStatus()}`);
                index++;
            });
        }
    }

    public deleteTask(index: number): void{
        
        if (this.tasks.length === 0) {
            console.log("Please add task before delete. ")
        }
        else if (index >= this.tasks.length) {
            console.log("provide valid index for delete the task. ")
        }
        else {
            this.tasks.splice(index, 1);
            console.log("Task Deleted succesfully");
        }   
    }
    
    public taskCompleted(index: number)  : void{
        let task = this.tasks[index];
        task.taskCompleted();
        console.log("Task status updated succesfully");
    }
}