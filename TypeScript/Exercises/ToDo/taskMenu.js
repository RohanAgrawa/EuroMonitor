"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayMenu = void 0;
var input_1 = require("../input");
var taskService_1 = require("./taskService");
var taskService = new taskService_1.TaskService();
function displayMenu() {
    console.log("----------------------------------------------------------------------");
    console.log("1. Add new Task : ");
    console.log("2. Mark Task is completed : ");
    console.log("3. Display Tasks : ");
    console.log("4. Delete a Task : ");
    console.log("5. Exit fom App : ");
    console.log("----------------------------------------------------------------------");
    console.log();
    input_1.r.question("Enter choice :- ", function (options) {
        if (options === "1") {
            input_1.r.question("Enter title of Task :- ", function (title) {
                input_1.r.question("Enter Task Description :- ", function (description) {
                    taskService.addTask(title, description);
                    displayMenu();
                });
            });
        }
        else if (options === "2") {
            input_1.r.question("Enter Task Id for completing the task :- ", function (id) {
                taskService.taskCompleted(+id);
                displayMenu();
            });
        }
        else if (options === "3") {
            taskService.getTasks();
            displayMenu();
        }
        else if (options === "4") {
            input_1.r.question("Enter Task Id for deleting the task :- ", function (id) {
                taskService.deleteTask(+id);
                displayMenu();
            });
        }
        else {
            input_1.r.close();
        }
    });
}
exports.displayMenu = displayMenu;
