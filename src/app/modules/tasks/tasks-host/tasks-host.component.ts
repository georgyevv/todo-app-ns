import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Todo } from "~/app/shared/models/models";
import { TodoService } from "~/app/shared/services/todo.service";

@Component({
    selector: "ns-tasks-host",
    templateUrl: "./tasks-host.component.html",
    styleUrls: ["./tasks-host.component.css"],
    moduleId: module.id
})
export class TasksHostComponent implements OnInit {
    public todoItems: ObservableArray<Todo>;

    constructor(public readonly todoService: TodoService) {}

    public ngOnInit() {
        console.log("TasksHostComponent init");
        this.todoService.getTodos$.subscribe(data => {
            this.todoItems = new ObservableArray<Todo>(data);
        });
    }

    public onAddTodo(todo: Todo) {
        this.todoService.addTodo(todo);
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
