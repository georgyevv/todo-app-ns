import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ViewContainerRef } from "@angular/core";
import { Button } from "tns-core-modules/ui/button";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";
import { screen } from "tns-core-modules/platform";

import { Todo } from "~/app/core/models/models";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { DuedateModalComponent } from "~/app/shared/modals/duedate-modal/duedate-modal.component";
import { PrioritiesModalComponent } from "~/app/shared/modals/priorities-modal/priorities-modal.component";
import { ParentModalComponent } from '~/app/shared/modals/parent-modal/parent-modal.component';

@Component({
    selector: "ns-details-form",
    templateUrl: "./details-form.component.html",
    styleUrls: ["./details-form.component.css"],
    moduleId: module.id
})
export class DetailsFormComponent {
    public todo: Todo;

    @ViewChild("saveButton", { static: false }) set saveButton(content: ElementRef) {
        if (content) {
            const button = <Button>content.nativeElement;
            AbsoluteLayout.setTop(button, 125);
            AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 20);
        }
    }

    @Input() set model(model: Todo) {
        this.todo = model;
    }
    @Output() save: EventEmitter<Todo> = new EventEmitter<Todo>();
    @Output() delete: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef) {}

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
    }

    public async onOpenParentModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: this.todo.parent,
            fullscreen: false
        };
        const parent = await this.modalService.showModal(ParentModalComponent, options);
        if (parent !== null) {
            this.todo.parent = parent;
        }
    }

    public onSave() {
        this.save.emit(this.todo);
    }

    public onDelete() {
        this.delete.emit();
    }
}
