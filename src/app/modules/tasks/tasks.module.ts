import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from "~/app/shared/shared.module";
import { TasksHostComponent } from "./tasks-host/tasks-host.component";

@NgModule({
    declarations: [TasksHostComponent],
    exports: [TasksHostComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        SharedModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TasksModule {}
