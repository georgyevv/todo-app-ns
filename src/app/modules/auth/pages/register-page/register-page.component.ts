import { Component, ViewContainerRef, OnDestroy } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { Subject } from "rxjs";

import { RegisterUser } from "~/app/core/models/models";
import { AuthService } from "../../services/auth.service";
import { NavigationService } from "~/app/core/services/navigation.service";
import { Store } from "~/app/core/state/app-store";
import { LoadingModalComponent } from "~/app/shared/modals/loading-modal/loading-modal.component";
import { Subscription } from "rxjs";

@Component({
    selector: "ns-register-page",
    templateUrl: "./register-page.component.html",
    styleUrls: ["./register-page.component.css"],
    moduleId: module.id
})
export class RegisterPageComponent implements OnDestroy {
    private loadingDialog$$: Subject<void>;
    public currentUser: RegisterUser;

    private registrationSubscription: Subscription;

    constructor(
        private readonly authService: AuthService,
        private readonly store: Store,
        private readonly navigationService: NavigationService,
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef
    ) {
        this.currentUser = new RegisterUser("", "", "");
        this.loadingDialog$$ = new Subject();
    }

    public async onRegister(registerUser: RegisterUser) {
        this.openLoadingModal();

        this.registrationSubscription = this.authService.register(registerUser.email, registerUser.password).subscribe(
            () => {
                this.loadingDialog$$.next();
                setTimeout(() => this.navigationService.navigate(["/inbox"], { clearHistory: true }), 1);
            },
            error => {
                this.currentUser = new RegisterUser("", "", "");
                this.loadingDialog$$.next();

                const errorMsg = error.indexOf("FirebaseAuthUserCollisionException") > -1 ? "The email address is already in use by another account." : error;
                let options = {
                    title: "Register Error",
                    message: errorMsg,
                    okButtonText: "OK"
                };
                alert(options);
            }
        );
    }

    public ngOnDestroy() {
        if (this.registrationSubscription) {
            this.registrationSubscription.unsubscribe();
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
