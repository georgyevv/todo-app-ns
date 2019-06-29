import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationOptions } from "nativescript-angular/router/ns-location-strategy";
import { NavigationExtras } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class NavigationService {
    constructor(private routerExtensions: RouterExtensions) {}

    public navigate(commands: any[], extras?: NavigationExtras & NavigationOptions): Promise<boolean> {
        // //console.log(`Navigating: `, commands, extras);
        return this.routerExtensions.navigate(commands, extras);
    }

    public back() {
        // //console.log('Navigating back');
        this.routerExtensions.back();
    }

    public backToPreviousPage() {
        // //console.log('Navigating backToPreviousPage');
        this.routerExtensions.backToPreviousPage();
    }
}
