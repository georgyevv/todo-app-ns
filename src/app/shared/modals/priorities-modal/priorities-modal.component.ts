import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "ns-priorities-modal",
    templateUrl: "./priorities-modal.component.html",
    styleUrls: ["./priorities-modal.component.css"],
    moduleId: module.id
})
export class PrioritiesModalComponent {
    constructor(private params: ModalDialogParams) {}

    public onSelectPriority(priority: number) {
        this.params.closeCallback(priority);
    }

    public onCancel() {
        this.params.closeCallback(null);
    }
}
