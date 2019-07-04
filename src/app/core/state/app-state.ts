import { Todo } from "../models/models";
import * as firebase from "nativescript-plugin-firebase";

export type StateKey = "allTodos" | "selectedTodo" | "currentUser" | "showSpinner";

export interface State {
    allTodos: Todo[];
    selectedTodo: Todo;
    currentUser: firebase.User;
    showSpinner: boolean;
    [key: string]: any;
}

export const INITIAL_STATE: State = {
    allTodos: [],
    selectedTodo: undefined,
    currentUser: undefined,
    showSpinner: false
};
