import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MyDayHostComponent } from './modules/my-day/my-day-host/my-day-host.component';
import { TodoDetailsComponent } from './shared/components/todo-details/todo-details.component';
import { ImportantHostComponent } from './modules/important/important-host/important-host.component';
import { PlannedHostComponent } from './modules/planned/planned-host/planned-host.component';
import { SearchHostComponent } from './modules/search/search-host/search-host.component';
import { TasksHostComponent } from './modules/tasks/tasks-host/tasks-host.component';

const routes: Routes = [
    { path: "", redirectTo: "/my-day", pathMatch: "full" },
    { path: "my-day", component: MyDayHostComponent },
    { path: "important", component: ImportantHostComponent},
    { path: "planned", component: PlannedHostComponent },
    { path: "tasks", component: TasksHostComponent },
    { path: "search", component: SearchHostComponent },
    { path: "todo-details/:id", component: TodoDetailsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
