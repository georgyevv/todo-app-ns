import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Todo } from "~/app/shared/models/models";

@Component({
    selector: "ns-todo-list-entry",
    templateUrl: "./todo-list-entry.component.html",
    styleUrls: ["./todo-list-entry.component.css"],
    moduleId: module.id
})
export class TodoListEntryComponent implements OnInit {

    @Input() todo: Todo;
    @Input() showDetails: boolean = false;
    @Output() itemTap: EventEmitter<number> = new EventEmitter<number>();

    public onToggleComplete(todo: Todo) {
        todo.isCompleted = !todo.isCompleted;
    }

    ngOnInit(): void {
        console.dir(this.todo);
    }

    public onToggleFavourite(todo: Todo) {
        todo.isFavourite = !todo.isFavourite;
    }

    public onTapDetails() {
        console.dir(this.todo);
        this.itemTap.emit(this.todo.id);
    }
}
