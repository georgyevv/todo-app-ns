import { Component, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import * as firebase from "nativescript-plugin-firebase";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { confirm, action } from "tns-core-modules/ui/dialogs";

import { AccountService } from "~/app/modules/settings/services/account.service";
import { Store } from "~/app/core/state/app-store";
import { GenericInputModalComponent } from "~/app/shared/modals/generic-input-modal/generic-input-modal.component";
import { AuthService } from "~/app/modules/auth/services/auth.service";
import { NavigationService } from "~/app/core/services/navigation.service";
import { UploadFileResult } from "nativescript-plugin-firebase/storage/storage";
import { FileService } from "~/app/core/services/file.service";
import { CameraService } from "~/app/core/services/camera.service";

@Component({
    selector: "ns-account-page",
    templateUrl: "./account-page.component.html",
    styleUrls: ["./account-page.component.css"],
    moduleId: module.id
})
export class AccountPageComponent {
    public currentUser$ = this.store.select<firebase.User>("currentUser");

    constructor(
        private readonly store: Store,
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly accountService: AccountService,
        private readonly authService: AuthService,
        private readonly navigationService: NavigationService,
        private readonly fileService: FileService,
        private readonly cameraService: CameraService
    ) {}

    public async onChangeYourAvatar() {
        let options = {
            actions: ["Take photo", "Choose photo", "Remove current photo"]
        };

        const actionResult = await action(options);
        if (actionResult === "Take photo") {
            const imageAsset = await this.cameraService.takePicture();
            const imageURL = await this.fileService.uploadUserProfilePicture(imageAsset.android);
            this.accountService.updateProfileIMG(imageURL);
        } else if (actionResult === "Choose photo") {
            const imageAsset = await this.fileService.selectImageFromPhone();
            const imageURL = await this.fileService.uploadUserProfilePicture(imageAsset.android);
            this.accountService.updateProfileIMG(imageURL);
        } else if (actionResult === "Remove current photo") {
            this.accountService.updateProfileIMG("");
        }
    }

    public async onChangeYourDisplayName() {
        const currentUser = this.store.value.currentUser;

        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { title: "Type your name", text: currentUser.displayName },
            fullscreen: false
        };
        const newDisplayName: string = await this.modalService.showModal(GenericInputModalComponent, options);
        if (newDisplayName) {
            this.accountService.updateDisplayName(newDisplayName);
        }
    }

    public async onChangeYourEmail() {
        const currentUser = this.store.value.currentUser;

        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { title: "Email", text: currentUser.email },
            fullscreen: false
        };
        const newEmail: string = await this.modalService.showModal(GenericInputModalComponent, options);
        if (newEmail) {
            this.accountService.updateEmail(newEmail);
        }
    }

    public async onChangeYourPassword() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { title: "Password", isPassword: true },
            fullscreen: false
        };
        const newPassword = await this.modalService.showModal(GenericInputModalComponent, options);
        if (newPassword) {
            this.accountService.updatePassword(newPassword);
        }
    }

    public async onDeleteAccount() {
        let options = {
            title: "Confirmation required",
            message: "Are you sure you want to DELETE your account? This cannot be undone.",
            okButtonText: "Delete",
            cancelButtonText: "No"
        };

        const shouldDelete = await confirm(options);
        if (shouldDelete) {
            this.accountService.deleteAccount();
            await this.authService.logOut();
            this.navigationService.navigate(["auth"], { clearHistory: true });
        }
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
