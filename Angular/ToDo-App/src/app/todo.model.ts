export class TodoModel{
  public taskName : string;
  public isCompleted : boolean;
  public index : number;

  constructor(taskName : string) {
    this.taskName = taskName;
    this.isCompleted = false;
  }
}
