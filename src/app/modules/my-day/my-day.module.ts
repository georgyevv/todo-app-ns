import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { MyDayHostComponent } from "./my-day-host/my-day-host.component";
import { SharedModule } from "~/app/shared/shared.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
    declarations: [
        MyDayHostComponent
    ],
    imports: [
        NativeScriptCommonModule, 
        NativeScriptRouterModule, 
        NativeScriptFormsModule, 
        NativeScriptUIListViewModule, 
        SharedModule
    ],
    exports: [MyDayHostComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MyDayModule {}
