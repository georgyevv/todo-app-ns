import { Component, OnDestroy } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Subscription } from "rxjs";

@Component({
    selector: "ns-loading-modal",
    templateUrl: "./loading-modal.component.html",
    styleUrls: ["./loading-modal.component.scss"],
    moduleId: module.id
})
export class LoadingModalComponent implements OnDestroy {
    private subscription: Subscription;

    constructor(private readonly params: ModalDialogParams) {
        if (params.context.closeObserver) {
            this.subscription = params.context.closeObserver.subscribe(() => {
                this.close();
            });
        }
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public close() {
        this.params.closeCallback();
    }
}
