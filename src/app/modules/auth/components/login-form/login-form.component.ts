import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { LoginUser } from "~/app/core/models/models";
import { KeyboardHelperService } from "~/app/core/helpers/keyboard-helper.service";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular/dataform-directives";

@Component({
    selector: "ns-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.css"],
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    @Input() user: LoginUser;
    @Output() login: EventEmitter<LoginUser> = new EventEmitter<LoginUser>();

    @ViewChild("loginForm", { static: false }) loginForm: RadDataFormComponent;

    constructor(private readonly keyboardHelper: KeyboardHelperService) {}

    public async onLogin() {
        const isValid = await this.loginForm.dataForm.validateAndCommitAll();

        if (isValid) {
            this.keyboardHelper.dismissSoftKeybaord();
            this.login.emit(this.user);
        } else {
            let options = {
                title: "Login Error",
                message: "Please fix fields errors and try again",
                okButtonText: "OK"
            };

            await alert(options);
        }
    }
}
