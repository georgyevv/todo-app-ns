import { Component, OnInit } from '@angular/core';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    moduleId: module.id,
    selector: 'ns-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    public expandUserOptions: boolean = false;

    private _sideDrawerTransition: DrawerTransitionBase;

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    constructor(private readonly routerExtensions: RouterExtensions) { }

    public ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    public redirectAndCloseDrawer(url: string) {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        this.routerExtensions.navigate([url], { transition: { name: 'slideLeft' } });
    }

    public toggleUserOptions() {
        this.expandUserOptions = !this.expandUserOptions;
    }
}
