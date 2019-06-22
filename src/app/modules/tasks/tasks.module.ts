import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TasksHostComponent } from './tasks-host/tasks-host.component';

@NgModule({
  declarations: [TasksHostComponent],
  exports: [TasksHostComponent],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TasksModule { }
