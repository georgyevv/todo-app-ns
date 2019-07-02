import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { SettingsRoutingModule } from "./settings-routing.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SettingsPageComponent } from "./settings-page/settings-page.component";
import { SettingsContainerComponent } from "./containers/settings-container/settings-container.component";
import { AccountPageComponent } from "./pages/account-page/account-page.component";
import { AccountRepository } from './services/account.repository';
import { AccountService } from './services/account.service';

@NgModule({
    declarations: [SettingsPageComponent, AccountPageComponent, SettingsContainerComponent],
    imports: [SettingsRoutingModule, NativeScriptCommonModule],
    exports: [SettingsPageComponent],
    providers: [AccountRepository, AccountService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SettingsModule {}
