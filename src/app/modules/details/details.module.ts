import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { DetailsPageComponent } from "./details-page/details-page.component";
import { DetailsFormComponent } from "./details-form/details-form.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    declarations: [DetailsPageComponent, DetailsFormComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule
    ],
    exports: [DetailsPageComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DetailsModule {}
