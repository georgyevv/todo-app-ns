import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ImportantHostComponent } from './important-host/important-host.component';

@NgModule({
    declarations: [ImportantHostComponent],
    exports: [ImportantHostComponent],
    imports: [NativeScriptCommonModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ImportantModule {}
