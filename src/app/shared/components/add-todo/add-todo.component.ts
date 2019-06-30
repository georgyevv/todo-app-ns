import { Component, EventEmitter, Output, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
var utils = require("tns-core-modules/utils/utils");

import { Todo } from "~/app/core/models/models";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { DuedateModalComponent } from '../../modals/duedate-modal/duedate-modal.component';
import { PrioritiesModalComponent } from '../../modals/priorities-modal/priorities-modal.component';

@Component({
    selector: "ns-add-todo",
    templateUrl: "./add-todo.component.html",
    styleUrls: ["./add-todo.component.css"],
    moduleId: module.id
})
export class AddTodoComponent implements OnInit {
    public todo: Todo;

    @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

    constructor(
        private readonly page: Page,
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef) {

        this.todo = <Todo>{};
    }

    public ngOnInit() {
        this.focusTitle();
    }

    public async onOpenDuedateModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {},
            fullscreen: false
        };
        const dueDate = await this.modalService.showModal(DuedateModalComponent, options);
        if (dueDate !== null) {
            this.todo.dueDate = dueDate;
        }
        this.focusTitle();
    }

    public onRemoveDueDate() {
        this.todo.dueDate = undefined;
    }

    public async onOpenPrioritiesModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {},
            fullscreen: false
        };
        const priority = await this.modalService.showModal(PrioritiesModalComponent, options);
        if (priority !== null) {
            this.todo.priority = priority;
        }
        this.focusTitle();
    }

    public onRemovePriority() {
        this.todo.priority = undefined;
    }

    public onAddTodo() {
        this.addTodo.emit(this.todo);
    }

    private focusTitle() {
        let focusTextField: any = this.page.getViewById("todo-title");

        if (focusTextField.ios) {
            focusTextField.focus();
        }

        if (focusTextField.android) {
            setTimeout(() => {
                focusTextField.android.requestFocus();
                var imm = utils.ad.getInputMethodManager();
                imm.showSoftInput(focusTextField.android, 0);
            }, 300);
        }
    }
}
