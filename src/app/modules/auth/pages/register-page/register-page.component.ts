import { Component, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { Subject } from "rxjs";

import { RegisterUser } from "~/app/core/models/models";
import { AuthService } from "../../services/auth.service";
import { NavigationService } from "~/app/core/services/navigation.service";
import { Store } from "~/app/core/state/app-store";
import { LoadingModalComponent } from "~/app/shared/modals/loading-modal/loading-modal.component";

@Component({
    selector: "ns-register-page",
    templateUrl: "./register-page.component.html",
    styleUrls: ["./register-page.component.css"],
    moduleId: module.id
})
export class RegisterPageComponent {
    private loadingDialog$$: Subject<void>;

    public currentUser: RegisterUser;

    constructor(
        private readonly authService: AuthService,
        private readonly store: Store,
        private readonly navigationService: NavigationService,
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef) {

        this.currentUser = new RegisterUser("", "", "");
        this.loadingDialog$$ = new Subject();
    }

    public async onRegister(registerUser: RegisterUser) {
        this.openLoadingModal();

        try {
            const user = await this.authService.register(registerUser.email, registerUser.password);
            this.store.set("currentUser", user);
            this.navigationService.navigate(["/inbox"], { clearHistory: true });
            this.loadingDialog$$.next();
        } catch (error) {
            const errorMsg = error.indexOf("FirebaseAuthUserCollisionException") > -1 ? "The email address is already in use by another account." : error;

            let options = {
                title: "Register Error",
                message: errorMsg,
                okButtonText: "OK"
            };

            this.loadingDialog$$.next();
            await alert(options);
            this.currentUser = new RegisterUser("", "", "");
        }
    }

    private openLoadingModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { closeObserver: this.loadingDialog$$.asObservable() },
            fullscreen: false
        };
        this.modalService.showModal(LoadingModalComponent, options);
    }
}
