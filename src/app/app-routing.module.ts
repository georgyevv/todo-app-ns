import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { InboxPageComponent } from "./modules/inbox/inbox-page/inbox-page.component";
import { AuthGuard } from "./modules/auth/services/auth.guard";
import { DetailsPageComponent } from "./modules/details/details-page/details-page.component";
import { SettingsPageComponent } from './modules/settings/settings-page/settings-page.component';

const routes: Routes = [
    { path: "", redirectTo: "/inbox", pathMatch: "full" },
    { path: "inbox", component: InboxPageComponent, canActivate: [AuthGuard] },
    { path: "settings", component: SettingsPageComponent, canActivate: [AuthGuard] },
    { path: "todo-details/:id", component: DetailsPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forRoot(routes, {
            enableTracing: false // <-- debugging purposes only
        })
    ],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
