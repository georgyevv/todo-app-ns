import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SharedModule } from "~/app/shared/shared.module";
import { SevenDaysPageComponent } from "./seven-days-page/seven-days-page.component";

@NgModule({
    declarations: [SevenDaysPageComponent],
    imports: [NativeScriptCommonModule, NativeScriptRouterModule, SharedModule],
    exports: [SevenDaysPageComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SevenDaysModule {}
