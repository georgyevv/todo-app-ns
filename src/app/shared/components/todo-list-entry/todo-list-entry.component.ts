import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from "~/app/shared/models/models";

@Component({
    selector: "ns-todo-list-entry",
    templateUrl: "./todo-list-entry.component.html",
    styleUrls: ["./todo-list-entry.component.css"],
    moduleId: module.id
})
export class TodoListEntryComponent {
    @Input() todo: Todo;
    @Input() showDetails: boolean = false;
    @Output() itemTap: EventEmitter<number> = new EventEmitter<number>();

    public onToggleComplete(todo: Todo) {
        todo.isCompleted = !todo.isCompleted;
    }

    public onToggleFavourite(todo: Todo) {
        todo.isFavourite = !todo.isFavourite;
    }

    public onTapDetails() {
        this.itemTap.emit(this.todo.id);
    }
}
