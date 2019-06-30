import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TodayHostComponent } from "./today-host/today-host.component";
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
    declarations: [
        TodayHostComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        SharedModule,
    ],
    exports: [TodayHostComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TodayModule {}
