import { Component, EventEmitter, Output, OnInit, ViewContainerRef, Input } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
var utils = require("tns-core-modules/utils/utils");

import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { DuedateModalComponent } from '../../modals/duedate-modal/duedate-modal.component';
import { PrioritiesModalComponent } from '../../modals/priorities-modal/priorities-modal.component';
import { ParentModalComponent } from '../../modals/parent-modal/parent-modal.component';
import { Todo } from '~/app/core/models/models';
import { GenericInputModalComponent } from '../../modals/generic-input-modal/generic-input-modal.component';
import { LabelsModalComponent } from '../../modals/labels-modal/labels-modal.component';

@Component({
    selector: "ns-add-todo",
    templateUrl: "./add-todo.component.html",
    styleUrls: ["./add-todo.component.scss"],
    moduleId: module.id
})
export class AddTodoComponent implements OnInit {
    public todo: Todo;

    @Input() set defaultDueDate(dueDate: Date) {
        this.todo.dueDate = dueDate;
    };
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

    public async onOpenLabelsModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { selectedLabels: this.todo.labels },
            fullscreen: false
        };
        const labels = await this.modalService.showModal(LabelsModalComponent, options);
        if (labels !== undefined) {
            this.todo.labels = labels;
        }
    }

    public onRemoveLabels() {
        this.todo.labels = undefined;
    }

    public async onOpenParentModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { currentItem: this.todo },
            fullscreen: false
        };
        const parent = await this.modalService.showModal(ParentModalComponent, options);
        if (parent !== null) {
            this.todo.parent = parent;
        }
        this.focusTitle();
    }

    public onRemoveParent() {
        this.todo.parent = undefined;
    }

    public async onOpenDescriptionModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {
                title: "Description",
                isTextView: true,
                text: this.todo.description
            },
            fullscreen: true
        };
        const description = await this.modalService.showModal(GenericInputModalComponent, options);
        if (description !== undefined) {
            this.todo.description = description;
        }
    }

    public onRemoveDescription() {
        this.todo.description = undefined;
    }

    public async onOpenReminderModal(){

    }

    public onRemoveReminder() {
        this.todo.reminder = undefined;
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
