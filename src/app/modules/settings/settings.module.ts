import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
    declarations: [SettingsPageComponent],
    imports: [
        SettingsRoutingModule,
        NativeScriptCommonModule
    ],
    exports: [
        SettingsPageComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SettingsModule { }
