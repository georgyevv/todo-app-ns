import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Todo } from '~/app/shared/models/models';
import { TodoService } from '~/app/shared/services/todo.service';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

@Component({
    selector: 'ns-my-day-host',
    templateUrl: './my-day-host.component.html',
    styleUrls: ['./my-day-host.component.css'],
    moduleId: module.id
})
export class MyDayHostComponent implements OnInit {
    public todoItems: ObservableArray<Todo>;

    constructor(public readonly todoService: TodoService) {}

    public ngOnInit() {
        console.log("MyDayHostComponent init");
        this.todoService.getMyDayTodos$.subscribe((data) => {
            this.todoItems = new ObservableArray<Todo>(data);
        })
    }

    public onAddTodo(todo: Todo) {
        this.todoService.addTodo(todo);
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
