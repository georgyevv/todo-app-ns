import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SharedModule } from "~/app/shared/shared.module";
import { MyDayHostComponent } from "./my-day-host/my-day-host.component";

@NgModule({
    declarations: [
        MyDayHostComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        SharedModule,
    ],
    exports: [MyDayHostComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MyDayModule {}
