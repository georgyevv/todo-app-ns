import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from "@angular/core";
import { ListViewEventData } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { screen } from "tns-core-modules/platform";
import { Button } from "tns-core-modules/ui/button";
import { View } from "tns-core-modules/ui/core/view/view";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";
import { confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";

import { Todo } from "../../../core/models/models";
import { NavigationService } from "../../../core/services/navigation.service";
import { TodosRepoService } from "../../../core/services/todos-repo.service";

@Component({
    selector: "ns-todo-list",
    templateUrl: "./todo-list.component.html",
    styleUrls: ["./todo-list.component.css"],
    moduleId: module.id
})
export class TodoListComponent implements AfterViewInit {
    public showAddTodo: boolean = false;

    @ViewChild("addTodoButton", { static: true }) addTodoButton: ElementRef;
    @ViewChild("myListView", { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;

    @Input() todoItems: Todo[];
    @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
    @Output() load: EventEmitter<void> = new EventEmitter<void>();

    constructor(private readonly navigationService: NavigationService, private readonly todoRepoService: TodosRepoService) {}

    public ngAfterViewInit() {
        const button = <Button>this.addTodoButton.nativeElement;
        // This is not okay must be changes (150) is for the top navigation which is included in the heightDIP i guess
        AbsoluteLayout.setTop(button, screen.mainScreen.heightDIPs - Number(button.height) - 150);
        // This is not okay must be changes (20) wtf is 20 ? margin righ - MAGIN NUMBER
        AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 20);

        this.load.emit();
    }

    public onItemTap(id: number) {
        this.navigationService.navigate(["/todo-details/", id], { transition: { name: "slideLeft" } });
    }

    public onAddTodoAction() {
        this.showAddTodo = true;
    }

    public onAddTodo(todo: Todo) {
        this.addTodo.emit(todo);
        this.showAddTodo = false;
    }

    public onToggleFavourite(todo: Todo) {
        todo.isAddedToImportant = !todo.isAddedToImportant;
        this.todoRepoService.updateTodo(todo);
    }

    public onToggleComplete(todo: Todo) {
        todo.isCompleted = !todo.isCompleted;
        if (todo.isCompleted) {
            todo.completedOn = new Date();
        } else {
            todo.completedOn = undefined;
        }
        this.todoRepoService.updateTodo(todo);
    }

    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args["object"];
        const leftItem = swipeView.getViewById<View>("mark-view");
        const rightItem = swipeView.getViewById<View>("delete-view");
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }

    public onLeftSwipeClick(args: ListViewEventData) {
        // TODO: update current todo to be removed from MY DAY
        this.myListViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public async onRightSwipeClick(args) {
        const confirmOptions = {
            title: "Confirmation required",
            message: "Are you sure you want to delete this record?",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        } as ConfirmOptions;
        const shouldDelete = await confirm(confirmOptions);

        this.myListViewComponent.listView.notifySwipeToExecuteFinished();

        if (shouldDelete) {
            const todo: Todo = <Todo>args.object.bindingContext;
            this.todoRepoService.deleteTodo(todo.id);
            this.myListViewComponent.listView.notifySwipeToExecuteFinished();
        }
    }
}
