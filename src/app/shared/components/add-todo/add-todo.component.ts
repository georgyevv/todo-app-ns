import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '~/app/shared/models/models';

@Component({
    selector: 'ns-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.css'],
    moduleId: module.id
})
export class AddTodoComponent {
    public selectedIndex = 1;
    public items: Array<string>;
    public todo: Todo;

    @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

    constructor() {
        this.todo = <Todo>{};
        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
        }
    }

    public onAddTodo() {
        this.addTodo.emit(this.todo);
    }
}
