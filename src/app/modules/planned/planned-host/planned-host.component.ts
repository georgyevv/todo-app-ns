import { Component } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

@Component({
    selector: 'ns-planned-host',
    templateUrl: './planned-host.component.html',
    styleUrls: ['./planned-host.component.css'],
    moduleId: module.id
})
export class PlannedHostComponent {
    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
