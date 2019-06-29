import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { PlannedHostComponent } from "./planned-host/planned-host.component";

@NgModule({
    declarations: [PlannedHostComponent],
    exports: [PlannedHostComponent],
    imports: [NativeScriptCommonModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PlannedModule {}
