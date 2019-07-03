import { Component, OnInit } from "@angular/core";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
const firebase = require("nativescript-plugin-firebase");

import { NavigationService } from "./core/services/navigation.service";
import { AuthService } from "./modules/auth/services/auth.service";
import { Store } from "./core/state/app-store";
import { tap } from "rxjs/operators";
import { LoggerService } from './core/services/logger.service';

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    public showSpinner$ = this.store.select<boolean>("showSpinner").pipe(tap(data => console.log(data)));
    public currentUser$ = this.store.select<any>("currentUser");
    public expandUserOptions: boolean = false;

    constructor(
        private readonly store: Store,
        private readonly navigationService: NavigationService,
        private readonly authService: AuthService,
        private readonly loggerService: LoggerService) {}

    public async ngOnInit(): Promise<void> {
        this.loggerService.log("AppComponent#ngOnInit");

        await firebase.init({ persist: false });
    }

    public redirectAndCloseDrawer(url: string) {
        this.closeDrawer();
        this.expandUserOptions = false;
        this.navigationService.navigate([url], { transition: { name: "slideLeft" } });
    }

    public toggleUserOptions() {
        this.expandUserOptions = !this.expandUserOptions;
    }

    public async onLogOut() {
        await this.authService.logOut();
        this.closeDrawer();
        this.navigationService.navigate(["auth"], { clearHistory: true });
    }

    private closeDrawer() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
