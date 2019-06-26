import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoListEntryComponent } from './components/todo-list-entry/todo-list-entry.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DropDownModule } from "nativescript-drop-down/angular";
import { FriendlyDatePipe } from './pipes/friendly-date.pipe';

@NgModule({
    declarations: [
        DropdownComponent,
        AddTodoComponent,
        TodoDetailsComponent,
        TodoListEntryComponent,
        TodoListComponent,
        FriendlyDatePipe
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        DropDownModule,
    ],
    exports: [
        DropdownComponent,
        AddTodoComponent,
        TodoDetailsComponent,
        TodoListEntryComponent,
        TodoListComponent,
        FriendlyDatePipe,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
