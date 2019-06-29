import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthContainerComponent } from "./containers/auth-container/auth-container.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";

const routes: Routes = [
    {
        path: "auth",
        component: AuthContainerComponent,
        children: [
            {
                path: "login",
                component: LoginPageComponent,
                outlet: "loginTab"
            },
            {
                path: "register",
                component: RegisterPageComponent,
                outlet: "registerTab"
            }
        ]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AuthRoutingModule {}
