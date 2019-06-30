import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from '~/app/shared/shared.module';
import { DetailsFormComponent } from "./details-form/details-form.component";
import { DetailsPageComponent } from "./details-page/details-page.component";

@NgModule({
    declarations: [DetailsPageComponent, DetailsFormComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        SharedModule
    ],
    exports: [DetailsPageComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DetailsModule {}
