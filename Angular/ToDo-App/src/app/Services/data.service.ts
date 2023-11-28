import {TodoModel} from "../models/todo.model";

export class DataService {

  private todoItems : TodoModel[] = [];

  public addItems(taskName : string) : void{
    this.todoItems.push(new TodoModel(taskName));
  }

  public getItems() : TodoModel[]{
    return this.todoItems;
  }
}




