export class TodoModel{
  public taskName : string;
  public isCompleted : boolean;

  constructor(taskName : string) {
    this.taskName = taskName;
    this.isCompleted = false;
  }
}
