import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TextView } from "nativescript-angular/forms/value-accessors";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { action } from "tns-core-modules/ui/dialogs";

import { Todo } from "~/app/core/models/models";
import { NavigationService } from '~/app/core/services/navigation.service';
import { TodoService } from '../../../core/services/todo.service';

@Component({
    selector: "ns-todo-details",
    templateUrl: "./todo-details.component.html",
    styleUrls: ["./todo-details.component.css"],
    moduleId: module.id
})
export class TodoDetailsComponent implements OnInit {
    public duedateSelections: string[] = ["Today", "Tommorow", "Next week", "Pick a date"];
    public repeatSelections: string[] = ["Daily", "Weekdays", "Weekly", "Monthly", "Yearly", "Custom"];
    public repeatSelectionDetails: string;
    public weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    public isBusy: boolean = true;
    public todo: Todo;

    constructor(private route: ActivatedRoute, private readonly navigationService: NavigationService, private readonly todoService: TodoService) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get("id");
        this.todoService.getTodo(id).subscribe((todo: Todo) => {
            this.todo = todo;
            this.setDropdownDetails(this.todo.repeatType);
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

    public onShowDueDatePicker() {
        let options = {
            title: "Due date",
            message: "Choose due date",
            cancelButtonText: "Cancel",
            actions: this.duedateSelections
        };

        action(options).then(result => {
            if (result === "Today") {
                this.todo.dueDate = new Date();
            } else if (result === "Tommorow") {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 1);
                this.todo.dueDate = currentDate;
            } else if (result === "Next week") {
                const nextWeekDate = new Date();
                nextWeekDate.setDate(nextWeekDate.getDate() + ((7 - nextWeekDate.getDay()) % 7));
                this.todo.dueDate = nextWeekDate;
            } else {
                // this.todo.dueDate = nextWeekDate;
            }

            this.todoService.updateTodo(this.todo);
        });
    }

    public onRepeatTypeChange(args) {
        this.setDropdownDetails(args.newIndex);
        this.todo.repeatType = args.newIndex;
        this.todoService.updateTodo(this.todo);
    }

    public onDescriptionChange(args) {
        let textView = <TextView>args.object;
        this.todo.description = textView.text;
        this.todoService.updateTodo(this.todo);
    }

    public onDelete(): void {
        this.todoService.deleteTodo(this.todo.id);
        this.navigationService.back();
    }

    private setDropdownDetails(repeatSelectionIndex: number) {
        if (this.repeatSelections[repeatSelectionIndex] == "Weekdays") {
            this.repeatSelectionDetails = "Weekly";
        } else if (this.repeatSelections[repeatSelectionIndex] == "Weekly") {
            const currentDate = new Date();
            this.repeatSelectionDetails = this.weekdays[currentDate.getDay()];
        } else {
            this.repeatSelectionDetails = undefined;
        }
    }
}
