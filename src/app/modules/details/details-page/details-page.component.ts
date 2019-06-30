import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { NavigationService } from '~/app/core/services/navigation.service';
import { TodosRepoService } from '~/app/core/services/todos-repo.service';
import { Todo } from '~/app/core/models/models';
import { Store } from '~/app/core/state/app-store';

@Component({
    selector: "ns-details-page",
    templateUrl: "./details-page.component.html",
    styleUrls: ["./details-page.component.css"],
    moduleId: module.id
})
export class DetailsPageComponent implements OnInit {
    public todo$: Observable<Todo> = this.store.select<Todo>("selectedTodo");

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private readonly navigationService: NavigationService,
        private readonly todosRepoService: TodosRepoService) {}

    public ngOnInit() {
        const id = this.route.snapshot.paramMap.get("id");
        this.todosRepoService.fetchTodoDetails(id);
    }

    public onSave(todo: Todo) {
        this.todosRepoService.updateTodo(todo);
        this.goBack();
    }

    public goBack() {
        this.navigationService.back();
    }

    public onDelete() {}
}
