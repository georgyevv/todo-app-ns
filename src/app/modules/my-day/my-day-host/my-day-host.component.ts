import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { TodoService } from '~/app/shared/services/todo.service';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Todo } from '~/app/shared/models/models';

@Component({
    selector: 'ns-my-day-host',
    templateUrl: './my-day-host.component.html',
    styleUrls: ['./my-day-host.component.css'],
    moduleId: module.id
})
export class MyDayHostComponent implements OnInit {
    public todoItems: ObservableArray<Todo>;
    
    constructor(private readonly todoService: TodoService) {}

    public ngOnInit() {
        this.todoService.getTodos().subscribe(data => {
            this.todoItems = new ObservableArray(data);
        });
    }

    public onAddTodo(todo: Todo) {
        this.todoService.addTodo(todo);
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
