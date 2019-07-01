import { Component, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { Subject } from "rxjs";

import { LoginUser } from "~/app/core/models/models";
import { AuthService } from "../../services/auth.service";
import { NavigationService } from "~/app/core/services/navigation.service";
import { Store } from "~/app/core/state/app-store";
import { LoadingModalComponent } from "~/app/shared/modals/loading-modal/loading-modal.component";

@Component({
    selector: "ns-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.css"],
    moduleId: module.id
})
export class LoginPageComponent {
    private loadingDialog$$: Subject<void>;
    public currentUser: LoginUser;

    constructor(
        private readonly authService: AuthService,
        private readonly store: Store,
        private readonly navigationService: NavigationService,
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef) {
        this.currentUser = new LoginUser("", "");
        this.loadingDialog$$ = new Subject();
    }

    public async onLogin(loginUser: LoginUser) {
        this.openLoadingModal();

        try {
            const user = await this.authService.login(loginUser.email, loginUser.password);
            this.store.set("currentUser", user);
            this.navigationService.navigate(["/inbox"], { clearHistory: true });
            this.loadingDialog$$.next();
            // const token = await firebase.getAuthToken({ forceRefresh: false });
        } catch (error) {
            let options = {
                title: "Login Error",
                message: "Invalid email or password",
                okButtonText: "OK"
            };

            this.loadingDialog$$.next();
            await alert(options);
            this.currentUser = new LoginUser(this.currentUser.email, "");
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
