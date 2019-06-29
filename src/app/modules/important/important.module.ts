import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SharedModule } from "~/app/shared/shared.module";
import { ImportantHostComponent } from './important-host/important-host.component';

@NgModule({
    declarations: [ImportantHostComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        SharedModule
    ],
    exports: [ImportantHostComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ImportantModule {}
