
export class Task{

    public title: string;
    public description: string;
    private isCompleted: boolean;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
        this.isCompleted = false;
    }

    public taskCompleted() : void{
        this.isCompleted = true;
    }

    public getCompletionStatus(): boolean {
        return this.isCompleted;
    }
}