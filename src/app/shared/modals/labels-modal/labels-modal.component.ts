import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "ns-labels-modal",
    templateUrl: "./labels-modal.component.html",
    styleUrls: ["./labels-modal.component.scss"],
    moduleId: module.id
})
export class LabelsModalComponent {
    public newLabel: string;
    public selectedLabels: string[];

    constructor(private readonly params: ModalDialogParams) {
        this.selectedLabels = params.context.selectedLabels ? params.context.selectedLabels : [];
    }

    public onAddNewLabel() {
        this.selectedLabels.push(this.newLabel);
        this.newLabel = undefined;
    }

    public onRemoveLabel(label: string) {
        this.selectedLabels = this.selectedLabels.filter(l => l !== label);
    }

    public onSave() {
        this.params.closeCallback(this.selectedLabels);
    }

    public onCancel() {
        this.params.closeCallback(undefined);
    }
}
