"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(title, description) {
        this.title = title;
        this.description = description;
        this.isCompleted = false;
    }
    Task.prototype.taskCompleted = function () {
        this.isCompleted = true;
    };
    Task.prototype.getCompletionStatus = function () {
        return this.isCompleted;
    };
    return Task;
}());
exports.Task = Task;
