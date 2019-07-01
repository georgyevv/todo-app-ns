import { Component } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Store } from "~/app/core/state/app-store";

@Component({
    selector: "ns-settings-page",
    templateUrl: "./settings-page.component.html",
    styleUrls: ["./settings-page.component.css"],
    moduleId: module.id
})
export class SettingsPageComponent {
    public currentUser$ = this.store.select<any>("currentUser");

    constructor(private readonly store: Store) {}

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onRestoreAllDefauls() {}
}
