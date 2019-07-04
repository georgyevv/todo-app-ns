import { Component, OnInit, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { map } from "rxjs/operators";

import { Todo } from "~/app/core/models/models";
import { TodosService } from "~/app/core/services/todos.service";
import { Store } from "~/app/core/state/app-store";
import { LoggerService } from "~/app/core/services/logger.service";

@Component({
    selector: "ns-seven-days-page",
    templateUrl: "./seven-days-page.component.html",
    styleUrls: ["./seven-days-page.component.scss"],
    moduleId: module.id
})
export class SevenDaysPageComponent implements OnInit, AfterViewInit {
    public todos$ = this.store.select<Todo[]>("allTodos").pipe(
        map((todo: Todo[]) => {
            if (todo.length == 0) {
                return [];
            }

            const todayTodos = todo.filter((todo: Todo) => {
                if (!todo.dueDate) {
                    return;
                }

                const currentDate = new Date();
                return todo.dueDate.getDate() == currentDate.getDate();
            });

            return todayTodos;
        })
    );

    constructor(private store: Store, private todoRepoService: TodosService, private readonly loggerService: LoggerService) {
        this.store.set("showSpinner", true);
    }

    public ngOnInit() {
        this.loggerService.log("TodayPageComponent#ngOnInit");
        this.todoRepoService.getTodosList();
    }

    public ngAfterViewInit() {
        this.store.set("showSpinner", false);
    }

    public onAddTodo(todo: Todo) {
        this.todoRepoService.addTodo(todo);
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
