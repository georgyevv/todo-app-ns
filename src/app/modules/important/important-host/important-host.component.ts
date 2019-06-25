import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Todo } from "~/app/shared/models/models";
import { TodoService } from "~/app/shared/services/todo.service";

@Component({
    selector: "ns-important-host",
    templateUrl: "./important-host.component.html",
    styleUrls: ["./important-host.component.css"],
    moduleId: module.id
})
export class ImportantHostComponent implements OnInit {
    public todoItems: ObservableArray<Todo>;

    constructor(public readonly todoService: TodoService) {}

    public ngOnInit() {
        console.log("ImportantHostComponent init");
        this.todoService.importantTodos$.subscribe((data) => {
            this.todoItems = new ObservableArray<Todo>(data);
        })
    }

    public onAddTodo(todo: Todo) {
        this.todoService.addTodo(todo);
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
