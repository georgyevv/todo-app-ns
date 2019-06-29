import { Component } from "@angular/core";

import { LoginUser } from "~/app/core/models/models";
import { AuthService } from "../../services/auth.service";
import { NavigationService } from "~/app/core/services/navigation.service";
import { Store } from "~/app/core/state/app-store";

@Component({
    selector: "ns-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.css"],
    moduleId: module.id
})
export class LoginPageComponent {
    public currentUser: LoginUser;

    constructor(
        private readonly authService: AuthService,
        private readonly store: Store,
        private readonly navigationService: NavigationService) {

        this.currentUser = new LoginUser("", "");
    }

    public async onLogin(loginUser: LoginUser) {
        this.store.set("showSpinner", true);

        try {
            const user = await this.authService.login(loginUser.email, loginUser.password);
            this.store.set("currentUser", user);
            this.navigationService.navigate(["/my-day"], { clearHistory: true });
            // const token = await firebase.getAuthToken({ forceRefresh: false });
        } catch (error) {
            let options = {
                title: "Login Error",
                message: "Invalid email or password",
                okButtonText: "OK"
            };

            await alert(options);
            this.currentUser = new LoginUser(this.currentUser.email, "");
        }
    }
}
