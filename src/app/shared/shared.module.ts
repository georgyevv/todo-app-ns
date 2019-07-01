import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListEntryComponent } from './components/todo-list-entry/todo-list-entry.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { DuedateModalComponent } from './modals/duedate-modal/duedate-modal.component';
import { PrioritiesModalComponent } from './modals/priorities-modal/priorities-modal.component';
import { FriendlyDatePipe } from './pipes/friendly-date.pipe';
import { ParentModalComponent } from './modals/parent-modal/parent-modal.component';
import { DatepickerModalComponent } from './modals/datepicker-modal/datepicker-modal.component';
import { LoadingModalComponent } from './modals/loading-modal/loading-modal.component';

@NgModule({
    declarations: [
        AddTodoComponent,
        TodoListEntryComponent,
        TodoListComponent,
        FriendlyDatePipe,
        DuedateModalComponent,
        PrioritiesModalComponent,
        ParentModalComponent,
        DatepickerModalComponent,
        LoadingModalComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
    ],
    exports: [
        AddTodoComponent,
        TodoListEntryComponent,
        TodoListComponent,
        FriendlyDatePipe,
        DuedateModalComponent,
        PrioritiesModalComponent,
        ParentModalComponent,
        DatepickerModalComponent,
        LoadingModalComponent,
    ],
    entryComponents: [
        DuedateModalComponent,
        PrioritiesModalComponent,
        ParentModalComponent,
        DatepickerModalComponent,
        LoadingModalComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
