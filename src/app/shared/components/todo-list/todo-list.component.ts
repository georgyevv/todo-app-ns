import { Component, Input, ViewChild } from "@angular/core";
import { ListViewEventData } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { View } from "tns-core-modules/ui/core/view/view";
import { confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";

import { Todo } from "../../../core/models/models";
import { NavigationService } from "../../../core/services/navigation.service";
import { TodosService } from "../../../core/services/todos.service";

@Component({
    selector: "ns-todo-list",
    templateUrl: "./todo-list.component.html",
    styleUrls: ["./todo-list.component.scss"],
    moduleId: module.id
})
export class TodoListComponent {
    @ViewChild("myListView", { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;

    @Input() todoItems: Todo[];

    constructor(private readonly navigationService: NavigationService, private readonly todoRepoService: TodosService) {}

    public onItemTap(id: number) {
        this.navigationService.navigate(["/todo-details/", id], { transition: { name: "slideLeft" } });
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
