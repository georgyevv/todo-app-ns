import { NgModule, NO_ERRORS_SCHEMA, Optional, SkipSelf } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TodosRepository } from "./repositories/todos.repository";
import { Store } from "./state/app-store";
import { FileRepository } from "./repositories/file.repository";

@NgModule({
    declarations: [],
    imports: [NativeScriptCommonModule],
    providers: [Store, TodosRepository, FileRepository],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
        }
    }
}
