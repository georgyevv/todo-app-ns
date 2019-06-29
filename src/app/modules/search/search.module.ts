import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SearchHostComponent } from "./search-host/search-host.component";

@NgModule({
    declarations: [SearchHostComponent],
    exports: [SearchHostComponent],
    imports: [NativeScriptCommonModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule {}
