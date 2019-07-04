import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";

import { NavigationService } from "~/app/core/services/navigation.service";
import { TodosService } from "~/app/core/services/todos.service";
import { Todo } from "~/app/core/models/models";
import { Store } from "~/app/core/state/app-store";

@Component({
    selector: "ns-details-page",
    templateUrl: "./details-page.component.html",
    styleUrls: ["./details-page.component.scss"],
    moduleId: module.id
})
export class DetailsPageComponent implements OnInit {
    private todoId: string;
    public todo$: Observable<Todo> = this.store.select<Todo>("selectedTodo");

    constructor(
        private readonly store: Store,
        private readonly route: ActivatedRoute,
        private readonly navigationService: NavigationService,
        private readonly todosRepoService: TodosService) {}

    public ngOnInit() {
        this.todoId = this.route.snapshot.paramMap.get("id");
        this.todosRepoService.getTodoDetails(this.todoId);
    }

    public onSave(todo: Todo) {
        console.log(todo);
        this.todosRepoService.updateTodo(todo);
        this.goBack();
    }

    public goBack() {
        this.navigationService.back();
    }

    public async onDelete() {
        const confirmOptions = {
            title: "Confirmation required",
            message: "Are you sure you want to delete this record?",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        } as ConfirmOptions;
        const shouldDelete = await confirm(confirmOptions);

        if (shouldDelete) {
            this.todosRepoService.deleteTodo(this.todoId);
            this.navigationService.back();
        }
    }
}
