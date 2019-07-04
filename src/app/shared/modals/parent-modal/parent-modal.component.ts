import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import { Store } from '~/app/core/state/app-store';
import { Todo } from '~/app/core/models/models';
import { map } from 'rxjs/operators';

@Component({
    selector: "ns-parent-modal",
    templateUrl: "./parent-modal.component.html",
    styleUrls: ["./parent-modal.component.scss"],
    moduleId: module.id
})
export class ParentModalComponent {
    public currentItem: Todo;
    public selectedParent: Todo;
    public todos$: Observable<Todo[]>;

    constructor(
        private store: Store,
        private params: ModalDialogParams) {

        this.selectedParent = <Todo>this.params.context.selectedParent;
        this.currentItem = <Todo>this.params.context.currentItem;

        this.todos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => {
            return todos.filter((todo: Todo) => todo.id != this.currentItem.id);
        }));
    }

    public onSelectParent(todo: Todo) {
        this.params.closeCallback(todo);
    }

    public onNoParent() {
        this.params.closeCallback(null);
    }

    public onCancel() {
        this.params.closeCallback(undefined);
    }
}
