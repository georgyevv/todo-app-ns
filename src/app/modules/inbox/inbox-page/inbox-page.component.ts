import { Component, OnInit, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Todo } from "~/app/core/models/models";
import { TodosService } from "~/app/core/services/todos.service";
import { Store } from "~/app/core/state/app-store";
import { LoggerService } from '~/app/core/services/logger.service';

@Component({
    selector: "ns-inbox-page",
    templateUrl: "./inbox-page.component.html",
    styleUrls: ["./inbox-page.component.scss"],
    moduleId: module.id
})
export class InboxPageComponent implements OnInit, AfterViewInit {
    public todos$ = this.store.select<Todo[]>("allTodos");

    constructor(private store: Store, private todoRepoService: TodosService, private readonly loggerService: LoggerService) {
        this.store.set("showSpinner", true);
    }

    public ngOnInit() {
        this.loggerService.log("InboxPageComponent#ngOnInit");
        this.todoRepoService.getTodosList();
    }

    public ngAfterViewInit() {
        this.store.set("showSpinner", false);
    }

    public onAddTodo(todo: Todo) {
        if (!todo.priority) {
            todo.priority = 3; //This will be a default value
        }
        this.todoRepoService.addTodo(todo);
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
