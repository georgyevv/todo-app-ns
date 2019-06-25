import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Todo } from "~/app/shared/models/models";
import { TodoService } from "~/app/shared/services/todo.service";
import { TextView } from 'nativescript-angular/forms/value-accessors';

@Component({
    selector: "ns-todo-details",
    templateUrl: "./todo-details.component.html",
    styleUrls: ["./todo-details.component.css"],
    moduleId: module.id
})
export class TodoDetailsComponent implements OnInit {
    public isBusy: boolean = true;
    public todo: Todo;

    constructor(private route: ActivatedRoute, private readonly routerExtensions: RouterExtensions, private readonly todoService: TodoService) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get("id");
        this.todoService.getTodo(id).subscribe((todo: Todo) => {
            this.todo = todo;
            setTimeout(() => {
                this.isBusy = false;
            }, 500);
        });
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onToggleAddToMyDay(): void {
        this.todo.isAddedToMyDay = !this.todo.isAddedToMyDay;
        this.todoService.updateTodo(this.todo);
    }

    public onToggleFavourite() {
        this.todo.isAddedToImportant = !this.todo.isAddedToImportant;
        this.todoService.updateTodo(this.todo);
    }

    public onToggleComplete() {
        this.todo.isCompleted = !this.todo.isCompleted;
        if (this.todo.isCompleted) {
            this.todo.completedOn = new Date();
        } else {
            this.todo.completedOn = undefined;
        }
        this.todoService.updateTodo(this.todo);
    }

    public onDescriptionChange(args){
        let textView = <TextView>args.object;
        this.todo.description = textView.text;
        this.todoService.updateTodo(this.todo);
    }

    public onDelete(): void {
        this.todoService.deleteTodo(this.todo.id);
        this.routerExtensions.back();
    }
}
