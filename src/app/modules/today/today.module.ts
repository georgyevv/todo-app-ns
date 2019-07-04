import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SharedModule } from "~/app/shared/shared.module";
import { TodayPageComponent } from "./today-page/today-page.component";

@NgModule({
    declarations: [TodayPageComponent],
    imports: [NativeScriptCommonModule, NativeScriptRouterModule, SharedModule],
    exports: [TodayPageComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TodayModule {}
