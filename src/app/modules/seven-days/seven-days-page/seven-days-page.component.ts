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
    selector: "ns-seven-days-page",
    templateUrl: "./seven-days-page.component.html",
    styleUrls: ["./seven-days-page.component.scss"],
    moduleId: module.id
})
export class SevenDaysPageComponent implements OnInit, AfterViewInit {
    public todayDate: Date = new Date();
    public get tommorowDate() {
        return new Date(this.todayDate.getTime() + 24 * 60 * 60 * 1000);
    }
    public get thirdDayDate() {
        return new Date(this.todayDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    }
    public get fourthDayDate() {
        return new Date(this.todayDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    }
    public get fiftDayDate() {
        return new Date(this.todayDate.getTime() + 4 * 24 * 60 * 60 * 1000);
    }
    public get sixthDayDate() {
        return new Date(this.todayDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    }
    public get seventhDayDate() {
        return new Date(this.todayDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    }

    public showAddTodo: boolean = false;

    @ViewChild("addTodoButton", { static: true }) addTodoButton: ElementRef;

    public todos$ = this.store.select<Todo[]>("allTodos").pipe(
        map((rawTodos: Todo[]) => {
            if (rawTodos.length == 0) {
                return [];
            }

            const todos = rawTodos.filter((todo: Todo) => {
                if (!todo.dueDate) {
                    return;
                }

                const currentDate = new Date();
                return todo.dueDate.getDate() <= currentDate.getDate() + 7;
            });

            return todos;
        })
    );
    public todayTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 0)));
    public tomorrowTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 1)));
    public thirdDayTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 2)));
    public fourthTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 3)));
    public fifthTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 4)));
    public sixthTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 5)));
    public seventhTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 6)));

    constructor(private store: Store, private todoRepoService: TodosService, private readonly loggerService: LoggerService) {
        this.store.set("showSpinner", true);
    }

    public ngOnInit() {
        this.loggerService.log("TodayPageComponent#ngOnInit");
        this.todoRepoService.getTodosList();
    }

    public ngAfterViewInit() {
        const button = <Button>this.addTodoButton.nativeElement;
        AbsoluteLayout.setTop(button, screen.mainScreen.heightDIPs - Number(button.height) - 150);
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

    private filterTODOByDay(rawTodos: Todo[], additionalDays: number) {
        if (rawTodos.length == 0) {
            return [];
        }

        const todos = rawTodos.filter((todo: Todo) => {
            if (!todo.dueDate) {
                return;
            }

            const currentDate = new Date();
            return todo.dueDate.getDate() == currentDate.getDate() + additionalDays;
        });

        return todos;
    }
}
