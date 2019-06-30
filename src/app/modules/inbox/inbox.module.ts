import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { InboxPageComponent } from "./inbox-page/inbox-page.component";
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
    declarations: [
        InboxPageComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        SharedModule,
    ],
    exports: [InboxPageComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class InboxModule {}
