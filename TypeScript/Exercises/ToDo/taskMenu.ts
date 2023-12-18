import { r } from "../input";
import { TaskService } from "./taskService";

let taskService = new TaskService();

export function displayMenu() {
    
    console.log("----------------------------------------------------------------------");

    console.log("1. Add new Task : ");
    console.log("2. Mark Task is completed : ");
    console.log("3. Display Tasks : ");
    console.log("4. Delete a Task : ");
    console.log("5. Exit fom App : ")

    console.log("----------------------------------------------------------------------");

    console.log();

    r.question("Enter choice :- ", (options) => {

        if (options === "1") {
            
            r.question("Enter title of Task :- ", (title) => {

                r.question("Enter Task Description :- ", (description) => {
                    
                    taskService.addTask(title, description);
                    displayMenu();
                });
            });
        }

        else if (options === "2") {
            
            r.question("Enter Task Id for completing the task :- ", (id) => {
                taskService.taskCompleted(+id);
                displayMenu();
            })
        }

        else if (options === "3") {
            taskService.getTasks();
            displayMenu();
        }

        else if (options === "4") {
            r.question("Enter Task Id for deleting the task :- ", (id) => {
                taskService.deleteTask(+id);
                displayMenu();
            })
        }
        else {
            r.close();
        }
    });

}