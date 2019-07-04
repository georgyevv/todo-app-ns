import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { map } from "rxjs/operators";
import { screen } from "tns-core-modules/platform";
import { Button } from "tns-core-modules/ui/button";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";

import { Todo } from "~/app/core/models/models";
import { TodosService } from "~/app/core/services/todos.service";
import { Store } from "~/app/core/state/app-store";
import { LoggerService } from "~/app/core/services/logger.service";

@Component({
    selector: "ns-today-page",
    templateUrl: "./today-page.component.html",
    styleUrls: ["./today-page.component.scss"],
    moduleId: module.id
})
export class TodayPageComponent implements OnInit, AfterViewInit {
    public todayDate: Date = new Date();
    public showAddTodo: boolean = false;

    @ViewChild("addTodoButton", { static: true }) addTodoButton: ElementRef;

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
        const button = <Button>this.addTodoButton.nativeElement;
        // This is not okay must be changes (150) is for the top navigation which is included in the heightDIP i guess
        AbsoluteLayout.setTop(button, screen.mainScreen.heightDIPs - Number(button.height) - 150);
        // This is not okay must be changes (20) wtf is 20 ? margin righ - MAGIN NUMBER
        AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 20);

        this.store.set("showSpinner", false);
    }

    public onAddTodoAction() {
        this.showAddTodo = true;
    }

    public onAddTodo(todo: Todo) {
        this.todoRepoService.addTodo(todo);
        this.showAddTodo = false;
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
