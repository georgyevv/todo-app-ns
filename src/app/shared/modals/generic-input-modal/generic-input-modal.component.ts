import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "ns-generic-input-modal",
    templateUrl: "./generic-input-modal.component.html",
    styleUrls: ["./generic-input-modal.component.css"],
    moduleId: module.id
})
export class GenericInputModalComponent {
    public title: string;
    public text: string;

    constructor(private params: ModalDialogParams) {
        this.title = this.params.context.title;
        this.text = this.params.context.text;
    }

    public onSave() {
        this.params.closeCallback(this.text);
    }

    public onCancel() {
        this.params.closeCallback();
    }
}
