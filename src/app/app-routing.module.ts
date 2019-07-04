import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { InboxPageComponent } from "./modules/inbox/inbox-page/inbox-page.component";
import { AuthGuard } from "./modules/auth/services/auth.guard";
import { DetailsPageComponent } from "./modules/details/details-page/details-page.component";
import { TodayPageComponent } from "./modules/today/today-page/today-page.component";
import { SevenDaysPageComponent } from './modules/seven-days/seven-days-page/seven-days-page.component';

const routes: Routes = [
    { path: "", redirectTo: "inbox", pathMatch: "full" },
    { path: "inbox", component: InboxPageComponent, canActivate: [AuthGuard] },
    { path: "today", component: TodayPageComponent, canActivate: [AuthGuard] },
    { path: "seven-days", component: SevenDaysPageComponent, canActivate: [AuthGuard] },
    { path: "todo-details/:id", component: DetailsPageComponent }
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
