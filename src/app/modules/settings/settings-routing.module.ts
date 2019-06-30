import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
    {
        path: "",
        component: SettingsPageComponent
    },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }
