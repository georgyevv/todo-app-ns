import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { TodoService } from '~/app/shared/services/todo.service';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Todo } from '~/app/shared/models/models';

@Component({
    selector: "ns-important-host",
    templateUrl: "./important-host.component.html",
    styleUrls: ["./important-host.component.css"],
    moduleId: module.id
})
export class ImportantHostComponent implements OnInit {
    public todoItems: ObservableArray<Todo>;

    constructor(private readonly todoService: TodoService, private ref: ChangeDetectorRef) {}

    public ngOnInit() {
        console.log('ImportantHostComponent init');
        this.todoService.getImportantTodos().subscribe(data => {
            this.todoItems = new ObservableArray(data);
            console.log(data.length);
            this.ref.detectChanges();
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
