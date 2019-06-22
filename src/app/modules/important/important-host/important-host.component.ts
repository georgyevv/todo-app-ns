import { Component } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

@Component({
    selector: 'ns-important-host',
    templateUrl: './important-host.component.html',
    styleUrls: ['./important-host.component.css'],
    moduleId: module.id
})
export class ImportantHostComponent {
    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
