import { Component } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

@Component({
    selector: 'ns-tasks-host',
    templateUrl: './tasks-host.component.html',
    styleUrls: ['./tasks-host.component.css'],
    moduleId: module.id
})
export class TasksHostComponent {
    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
