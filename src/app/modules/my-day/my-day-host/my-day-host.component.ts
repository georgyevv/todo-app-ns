import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Todo } from "~/app/core/models/models";
import { TodosRepoService } from '~/app/core/services/todos-repo.service';
import { Store } from "~/app/core/state/app-store";

@Component({
    selector: "ns-my-day-host",
    templateUrl: "./my-day-host.component.html",
    styleUrls: ["./my-day-host.component.css"],
    moduleId: module.id
})
export class MyDayHostComponent implements OnInit {
    public todos$ = this.store.select<Todo[]>("myDayTodos");

    constructor(private store: Store, private todoRepoService: TodosRepoService) {}

    public ngOnInit() {
        //console.log("MyDayHostComponent init");
        this.todoRepoService.fetchMyDayTodosList();
    }

    public onAddTodo(todo: Todo) {
        this.todoRepoService.addTodo(todo);
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
