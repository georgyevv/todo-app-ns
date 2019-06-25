import { Component, OnInit } from "@angular/core";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
const firebase = require("nativescript-plugin-firebase");

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    public expandUserOptions: boolean = false;

    private _sideDrawerTransition: DrawerTransitionBase;

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    constructor(private readonly routerExtensions: RouterExtensions) {}

    public ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();

        firebase
            .init({
                // Optionally pass in properties for database, authentication and cloud messaging,
                // see their respective docs.
            })
            .then(
                () => {
                    console.log("firebase.init done");
                },
                error => {
                    console.log(`firebase.init error: ${error}`);
                }
            );
    }

    public redirectAndCloseDrawer(url: string) {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        this.routerExtensions.navigate([url], { transition: { name: "slideLeft" }, clearHistory: true });
    }

    public toggleUserOptions() {
        this.expandUserOptions = !this.expandUserOptions;
    }
}
