import {TodoModel} from "../todo.model";

class SharedData {

  public todoItems : TodoModel[] = [];
}

let sharedData = new SharedData();

export default sharedData;
