export class TodoModel{
  public taskName : string;
  public isCompleted : boolean;
  public index : number;

  constructor(taskName : string, index : number) {
    this.taskName = taskName;
    this.isCompleted = false;
    this.index = index;
  }
}
