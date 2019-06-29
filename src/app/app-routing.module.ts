import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MyDayHostComponent } from "./modules/my-day/my-day-host/my-day-host.component";
import { AuthGuard } from "./modules/auth/services/auth.guard";
import { TodoDetailsComponent } from "./shared/components/todo-details/todo-details.component";
import { TasksHostComponent } from "./modules/tasks/tasks-host/tasks-host.component";

const routes: Routes = [
    { path: "", redirectTo: "/my-day", pathMatch: "full" },
    { path: "my-day", component: MyDayHostComponent, canActivate: [AuthGuard] },
    { path: "tasks", component: TasksHostComponent, canActivate: [AuthGuard] },
    // {
    //     path: "important",
    //     loadChildren: "./modules/important/important.module#ImportantModule",
    //     canLoad: [AuthGuard]
    // },
    // {
    //     path: "planned",
    //     loadChildren: "./modules/planned/planned.module#PlannedModule",
    //     canLoad: [AuthGuard]
    // },
    // {
    //     path: "tasks",
    //     loadChildren: "./modules/tasks/tasks.module#TasksModule",
    //     canLoad: [AuthGuard]
    // },
    // {
    //     path: "search",
    //     loadChildren: "./modules/search/search.module#SearchModule",
    //     canLoad: [AuthGuard]
    // },
    { path: "todo-details/:id", component: TodoDetailsComponent, canActivate: [AuthGuard] }
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
