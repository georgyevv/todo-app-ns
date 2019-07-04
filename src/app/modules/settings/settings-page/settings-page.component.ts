import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Store } from "~/app/core/state/app-store";
import { LoggerService } from "~/app/core/services/logger.service";
import { NavigationService } from "~/app/core/services/navigation.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: "ns-settings-page",
    templateUrl: "./settings-page.component.html",
    styleUrls: ["./settings-page.component.scss"],
    moduleId: module.id
})
export class SettingsPageComponent implements OnInit {
    public currentUser$ = this.store.select<any>("currentUser");

    constructor(
        private readonly store: Store,
        private readonly loggerService: LoggerService,
        private readonly navigationService: NavigationService,
        private readonly activeRoute: ActivatedRoute,
        private readonly authService: AuthService) {}

    public ngOnInit() {
        this.loggerService.log("SettingsPageComponent#ngOnInit");
    }

    public onNavigate(url: string) {
        this.navigationService.navigate([url], { transition: { name: "slideLeft" }, relativeTo: this.activeRoute });
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onRestoreAllDefauls() {}

    public async onLogOut() {
        await this.authService.logOut();
        this.navigationService.navigate(["auth"], { clearHistory: true });
    }
}
