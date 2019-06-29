import { Todo } from "../models/models";
import * as firebase from "nativescript-plugin-firebase";

export type StateKey = "myDayTodos" | "importantTodos" | "plannedTodos" | "tasks" | "selectedTodo" | "currentUser" | "showSpinner";

export interface State {
    myDayTodos: Todo[];
    importantTodos: Todo[];
    plannedTodos: Todo[];
    tasks: Todo[];
    selectedTodo: Todo;
    currentUser: firebase.User;
    showSpinner: boolean;
    [key: string]: any;
}

export const INITIAL_STATE: State = {
    myDayTodos: [],
    importantTodos: [],
    plannedTodos: [],
    tasks: [],
    selectedTodo: undefined,
    currentUser: undefined,
    showSpinner: false
};
