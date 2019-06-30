import { Component } from "@angular/core";

import { RegisterUser } from "~/app/core/models/models";
import { NavigationService } from "~/app/core/services/navigation.service";
import { Store } from "~/app/core/state/app-store";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "ns-register-page",
    templateUrl: "./register-page.component.html",
    styleUrls: ["./register-page.component.css"],
    moduleId: module.id
})
export class RegisterPageComponent {
    public currentUser: RegisterUser;

    constructor(
        private readonly authService: AuthService,
        private readonly store: Store,
        private readonly navigationService: NavigationService) {

        this.currentUser = new RegisterUser("", "", "");
    }

    public async onRegister(registerUser: RegisterUser) {
        this.store.set("showSpinner", true);

        try {
            const user = await this.authService.register(registerUser.email, registerUser.password);
            this.store.set("currentUser", user);
            this.navigationService.navigate(["/inbox"], { clearHistory: true });
        } catch (error) {
            const errorMsg = error.indexOf("FirebaseAuthUserCollisionException") > -1 ? "The email address is already in use by another account." : error;

            let options = {
                title: "Register Error",
                message: errorMsg,
                okButtonText: "OK"
            };

            await alert(options);
            this.currentUser = new RegisterUser("", "", "");
        }
    }
}
