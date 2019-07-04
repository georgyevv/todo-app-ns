import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { LabelsModalComponent } from './modals/labels-modal/labels-modal.component';
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
import { GenericInputModalComponent } from './modals/generic-input-modal/generic-input-modal.component';
import { NativeScriptUIAutoCompleteTextViewModule } from 'nativescript-ui-autocomplete/angular/autocomplete-directives';

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
        GenericInputModalComponent,
        LabelsModalComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUIAutoCompleteTextViewModule,
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
        GenericInputModalComponent,
        LabelsModalComponent,
    ],
    entryComponents: [
        DuedateModalComponent,
        PrioritiesModalComponent,
        ParentModalComponent,
        DatepickerModalComponent,
        LoadingModalComponent,
        GenericInputModalComponent,
        LabelsModalComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
