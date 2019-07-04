import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import { Store } from '~/app/core/state/app-store';
import { Todo } from '~/app/core/models/models';

@Component({
    selector: "ns-parent-modal",
    templateUrl: "./parent-modal.component.html",
    styleUrls: ["./parent-modal.component.scss"],
    moduleId: module.id
})
export class ParentModalComponent {
    public selectedParent: Todo;
    public todos$: Observable<Todo[]> = this.store.select<Todo[]>("allTodos");

    constructor(
        private store: Store,
        private params: ModalDialogParams) {

        this.selectedParent = <Todo>this.params.context;
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
