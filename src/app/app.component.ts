import { Component, OnInit } from "@angular/core";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
const firebase = require("nativescript-plugin-firebase");

import { NavigationService } from "./core/services/navigation.service";
import { AuthService } from "./modules/auth/services/auth.service";
import { Store } from "./core/state/app-store";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    public showSpinner$ = this.store.select<boolean>("showSpinner");
    public currentUser$ = this.store.select<any>("currentUser");
    public expandUserOptions: boolean = false;

    private _sideDrawerTransition: DrawerTransitionBase;

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    constructor(private readonly store: Store, private readonly navigationService: NavigationService, private readonly authService: AuthService) {}

    public async ngOnInit(): Promise<void> {
        this._sideDrawerTransition = new SlideInOnTopTransition();

        await firebase.init({ persist: false });
    }

    public redirectAndCloseDrawer(url: string) {
        this.closeDrawer();
        this.navigationService.navigate([url], { transition: { name: "slideLeft" }, clearHistory: true });
    }

    public toggleUserOptions() {
        this.expandUserOptions = !this.expandUserOptions;
    }

    public async onSignOut() {
        await this.authService.signOut();
        this.closeDrawer();
        this.navigationService.navigate(["/auth"], { clearHistory: true });
    }

    private closeDrawer() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
