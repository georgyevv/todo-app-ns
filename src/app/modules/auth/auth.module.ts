import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { AuthRoutingModule } from './auth-routhing.module';
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { AuthContainerComponent } from "./containers/auth-container/auth-container.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
    declarations: [
        LoginFormComponent,
        RegisterFormComponent,
        AuthContainerComponent,
        RegisterPageComponent,
        LoginPageComponent
    ],
    imports: [
        NativeScriptCommonModule,
        AuthRoutingModule,
        NativeScriptUIDataFormModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
