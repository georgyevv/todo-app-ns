import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "ns-generic-input-modal",
    templateUrl: "./generic-input-modal.component.html",
    styleUrls: ["./generic-input-modal.component.scss"],
    moduleId: module.id
})
export class GenericInputModalComponent {
    public title: string;
    public text: string;
    public isPassword: boolean;
    public isTextView: boolean;

    constructor(private params: ModalDialogParams) {
        this.title = this.params.context.title;
        this.text = this.params.context.text;
        this.isPassword = this.params.context.isPassword;
        this.isTextView = this.params.context.isTextView;
    }

    public onSave() {
        this.params.closeCallback(this.text);
    }

    public onCancel() {
        this.params.closeCallback(undefined);
    }
}
