import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
  declarations: [],
  imports: [
    SettingsRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SettingsModule { }
