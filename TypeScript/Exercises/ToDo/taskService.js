"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
var task_1 = require("./task");
var TaskService = /** @class */ (function () {
    function TaskService() {
        this.tasks = [];
    }
    TaskService.prototype.addTask = function (title, description) {
        this.tasks.push(new task_1.Task(title, description));
        console.log("Task Added succesfully");
    };
    TaskService.prototype.getTasks = function () {
        var index = 0;
        if (this.tasks.length === 0) {
            console.log("No tasks is present. ");
        }
        else {
            console.log();
            console.log("id || title || description || status ");
            this.tasks.forEach(function (element) {
                console.log("".concat(index, " || ").concat(element.title, " || ").concat(element.description, " || ").concat(element.getCompletionStatus()));
                index++;
            });
        }
    };
    TaskService.prototype.deleteTask = function (index) {
        if (this.tasks.length === 0) {
            console.log("Please add task before delete. ");
        }
        else if (index >= this.tasks.length) {
            console.log("provide valid index for delete the task. ");
        }
        else {
            this.tasks.splice(index, 1);
            console.log("Task Deleted succesfully");
        }
    };
    TaskService.prototype.taskCompleted = function (index) {
        var task = this.tasks[index];
        task.taskCompleted();
        console.log("Task status updated succesfully");
    };
    return TaskService;
}());
exports.TaskService = TaskService;
