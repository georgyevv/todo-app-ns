import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ViewContainerRef } from "@angular/core";
import { Button } from "tns-core-modules/ui/button";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";
import { screen } from "tns-core-modules/platform";
import { action } from "tns-core-modules/ui/dialogs";

import { Todo, Project } from "~/app/core/models/models";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { DuedateModalComponent } from "~/app/shared/modals/duedate-modal/duedate-modal.component";
import { PrioritiesModalComponent } from "~/app/shared/modals/priorities-modal/priorities-modal.component";
import { ParentModalComponent } from "~/app/shared/modals/parent-modal/parent-modal.component";
import { LabelsModalComponent } from "~/app/shared/modals/labels-modal/labels-modal.component";
import { GenericInputModalComponent } from '~/app/shared/modals/generic-input-modal/generic-input-modal.component';

@Component({
    selector: "ns-details-form",
    templateUrl: "./details-form.component.html",
    styleUrls: ["./details-form.component.scss"],
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

    constructor(private readonly modalService: ModalDialogService, private readonly viewContainerRef: ViewContainerRef) {}

    public async onOpenDuedateModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {},
            fullscreen: false
        };
        const dueDate = await this.modalService.showModal(DuedateModalComponent, options);
        console.log("due date: " + dueDate);
        if (dueDate !== undefined) {
            console.log("set due date: " + dueDate);
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
        if (priority !== undefined) {
            this.todo.priority = priority;
        }
    }

    public async onOpenParentModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { selectedParent: this.todo.parent, currentItem: this.todo },
            fullscreen: false
        };
        const parent = await this.modalService.showModal(ParentModalComponent, options);
        if (parent !== undefined) {
            this.todo.parent = parent;
        }
    }

    public async onOpenProjectModal() {
        let options = {
            actions: ["Inbox", "Personal", "Shopping", "Work", "Errands", "Movies to watch"]
        };

        const actionResult = await action(options);
        if (actionResult) {
            this.todo.project = <Project>actionResult;
        }
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

    public async onOpenDetailsModal() {
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

    public onSave() {
        this.save.emit(this.todo);
    }

    public onDelete() {
        this.delete.emit();
    }
}
