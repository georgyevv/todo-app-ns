import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "ns-settings-page",
    templateUrl: "./settings-page.component.html",
    styleUrls: ["./settings-page.component.css"],
    moduleId: module.id
})
export class SettingsPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
