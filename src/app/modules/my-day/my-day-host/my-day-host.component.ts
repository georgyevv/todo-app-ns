import { Component } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

@Component({
    selector: 'ns-my-day-host',
    templateUrl: './my-day-host.component.html',
    styleUrls: ['./my-day-host.component.css'],
    moduleId: module.id
})
export class MyDayHostComponent {
    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
