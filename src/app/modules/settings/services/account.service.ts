import { Injectable, NgZone } from "@angular/core";
import { AccountRepository } from "./account.repository";
import { ServerErrorHandlerService } from "../../../core/services/server-error-handler.service";
import { Store } from "../../../core/state/app-store";
import { LoggerService } from "../../../core/services/logger.service";

@Injectable()
export class AccountService {
    constructor(
        private readonly repo: AccountRepository,
        private store: Store,
        private errorHandlerService: ServerErrorHandlerService,
        private zone: NgZone,
        private loggerService: LoggerService) {}

    public updateProfileIMG(photoURL: string): void {
        this.repo.updateProfileIMG(photoURL, this.errorHandlerService.handleFirestoreError, () => {
            this.zone.run(() =>
            {
                const currentUser = this.store.value.currentUser;
                currentUser.photoURL = photoURL;
                this.store.set("currentUser", currentUser);
                this.loggerService.log("Changed user photo url");
            });
        });
    }

    public updateDisplayName(displayName: string): void {
        this.repo.updateDisplayName(displayName, this.errorHandlerService.handleFirestoreError, () => {
            this.zone.run(() =>
            {
                const currentUser = this.store.value.currentUser;
                currentUser.displayName = displayName;
                this.store.set("currentUser", currentUser);
                this.loggerService.log("Changed user display name");
            });
        });
    }

    public updateEmail(email: string): void {
        this.repo.updateEmail(email, this.errorHandlerService.handleFirestoreError, () => {
            this.zone.run(() =>
            {
                const currentUser = this.store.value.currentUser;
                currentUser.email = email;
                this.store.set("currentUser", currentUser);
                this.loggerService.log("Changed user email");
            });
        });
    }

    public updatePassword(password: string): void {
        this.repo.updatePassword(password, this.errorHandlerService.handleFirestoreError, () => {
            this.loggerService.log("Changed user password");
        });
    }

    public deleteAccount() {
        this.repo.deleteAccount(this.errorHandlerService.handleFirestoreError, () => {
            this.loggerService.log("Deleted user account");
        });
    }
}
