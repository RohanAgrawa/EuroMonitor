export class TaskModel{

    public id: number;
    public title: string;
    public completionStatus: boolean;
    public dueDate: Date;
    public category: string;
    public userId : number;
    
    constructor(title: string, completionStatus: boolean, dueDate: Date, category: string, userId: number, id?: number){
        this.title = title;
        this.completionStatus = completionStatus;
        this.dueDate = dueDate;
        this.category = category;
        this.userId = userId;
        this.id = id;
    }
}