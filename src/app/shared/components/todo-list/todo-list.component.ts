import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { screen } from "tns-core-modules/platform";
import { Button } from "tns-core-modules/ui/button";
import { View } from "tns-core-modules/ui/core/view/view";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";
import { Todo } from "~/app/shared/models/models";
import { TodoService } from "../../services/todo.service";

@Component({
    selector: "ns-todo-list",
    templateUrl: "./todo-list.component.html",
    styleUrls: ["./todo-list.component.css"],
    moduleId: module.id
})
export class TodoListComponent implements OnInit {
    @ViewChild("addTodoButton", { static: true }) addTodoButton: ElementRef;
    @ViewChild("myListView", { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;

    @Input() todoItems: ObservableArray<Todo>;
    @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

    public showAddTodo: boolean = false;

    constructor(private readonly routerExtensions: RouterExtensions, private readonly todoService: TodoService) {}

    public ngOnInit() {
        const button = <Button>this.addTodoButton.nativeElement;
        // This is not okay must be changes (150) is for the top navigation which is included in the heightDIP i guess
        AbsoluteLayout.setTop(button, screen.mainScreen.heightDIPs - Number(button.height) - 150);
        // This is not okay must be changes (40) wtf is 40 ? margin righ
        AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 40);
    }

    public onItemTap(id: number) {
        this.routerExtensions.navigate(["/todo-details/", id], { transition: { name: "slideLeft" } });
    }

    public onAddTodoAction() {
        this.showAddTodo = true;
        console.dir(this.todoItems);
    }

    public onAddTodo(todo: Todo) {
        this.addTodo.emit(todo);
        this.showAddTodo = false;
    }

    public onToggleFavourite(todo: Todo) {
        todo.options.isAddedToImportant = !todo.options.isAddedToImportant;
        this.todoService.updateTodo(todo);
    }

    public onToggleComplete(todo: Todo) {
        todo.isCompleted = !todo.isCompleted;
        if (todo.isCompleted) {
            todo.completedOn = new Date();
        } else {
            todo.completedOn = undefined;
        }
        this.todoService.updateTodo(todo);
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

    public onRightSwipeClick(args) {
        this.todoItems.splice(this.todoItems.indexOf(args.object.bindingContext), 1);
    }
}
