import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "ns-loading-modal",
    templateUrl: "./loading-modal.component.html",
    styleUrls: ["./loading-modal.component.css"],
    moduleId: module.id
})
export class LoadingModalComponent {
    constructor(private readonly params: ModalDialogParams) {
        params.context.closeObserver.subscribe(() => {
            this.close();
        });
    }

    public close() {
        this.params.closeCallback();
    }
}
