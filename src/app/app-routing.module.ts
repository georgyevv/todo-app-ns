import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { TodayHostComponent } from "./modules/today/today-host/today-host.component";
import { AuthGuard } from "./modules/auth/services/auth.guard";
import { DetailsPageComponent } from "./modules/details/details-page/details-page.component";

const routes: Routes = [
    { path: "", redirectTo: "/today", pathMatch: "full" },
    { path: "today", component: TodayHostComponent },
    { path: "todo-details/:id", component: DetailsPageComponent },
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
