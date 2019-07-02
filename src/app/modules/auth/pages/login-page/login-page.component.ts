import { Component, ViewContainerRef, OnDestroy } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { Subject, Subscription } from "rxjs";

import { LoginUser } from "~/app/core/models/models";
import { AuthService } from "../../services/auth.service";
import { NavigationService } from "~/app/core/services/navigation.service";
import { LoadingModalComponent } from "~/app/shared/modals/loading-modal/loading-modal.component";
import { LoggerService } from "~/app/core/services/logger.service";

@Component({
    selector: "ns-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.css"],
    moduleId: module.id
})
export class LoginPageComponent implements OnDestroy {
    private loadingDialog$$: Subject<void>;
    public currentUser: LoginUser;

    private loginSubscription: Subscription;

    constructor(
        private readonly authService: AuthService,
        private readonly navigationService: NavigationService,
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly loggerService: LoggerService
    ) {
        this.currentUser = new LoginUser("", "");
        this.loadingDialog$$ = new Subject();
    }

    public onLogin(loginUser: LoginUser) {
        this.openLoadingModal();

        this.loginSubscription = this.authService.login(loginUser.email, loginUser.password).subscribe(
            () => {
                this.loadingDialog$$.next();
                setTimeout(() => this.navigationService.navigate(["/inbox"], { transition: { name: "slideLeft" }, clearHistory: true }), 1);
            },
            error => {
                this.currentUser = new LoginUser(this.currentUser.email, "");
                this.loadingDialog$$.next();

                let options = {
                    title: "Login Error",
                    message: "Invalid email or password",
                    okButtonText: "OK"
                };
                alert(options);
            }
        );
    }

    public ngOnDestroy() {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }

    private openLoadingModal() {
        this.loggerService.log("openLoadingModal");
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { closeObserver: this.loadingDialog$$.asObservable() },
            fullscreen: false
        };
        this.modalService.showModal(LoadingModalComponent, options);
    }
}
