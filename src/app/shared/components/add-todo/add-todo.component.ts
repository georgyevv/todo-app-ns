import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';

import { Todo } from '~/app/core/models/models';

@Component({
    selector: 'ns-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.css'],
    moduleId: module.id
})
export class AddTodoComponent implements OnInit {
    public selectedIndex = 1;
    public items: Array<string>;
    public todo: Todo;

    @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

    constructor(private readonly page: Page) {
        this.todo = <Todo>{};
        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
        }
    }

    public ngOnInit() {
        let focusTextField: any = this.page.getViewById("todo-title");
        focusTextField.focus();
    }

    public onAddTodo() {
        this.addTodo.emit(this.todo);
    }
}
