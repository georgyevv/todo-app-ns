import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Todo } from "~/app/core/models/models";
import { TodosRepoService } from '~/app/core/services/todos-repo.service';
import { Store } from "~/app/core/state/app-store";

@Component({
    selector: "ns-important-host",
    templateUrl: "./important-host.component.html",
    styleUrls: ["./important-host.component.css"],
    moduleId: module.id
})
export class ImportantHostComponent implements OnInit {
    public todos$ = this.store.select<Todo[]>("importantTodos");

    constructor(private store: Store, private todoRepoService: TodosRepoService) {}

    public ngOnInit() {
        //console.log("ImportantHostComponent init");
        this.todoRepoService.fetchImportantTodosList();
    }

    public onAddTodo(todo: Todo) {
        this.todoRepoService.addTodo(todo);
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
