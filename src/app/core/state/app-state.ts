import { Todo } from "../models/models";
import * as firebase from "nativescript-plugin-firebase";

export type StateKey = "todayTodos" | "allTodos" | "selectedTodo" | "currentUser" | "showSpinner";

export interface State {
    todayTodos: Todo[];
    allTodos: Todo[];
    selectedTodo: Todo;
    currentUser: firebase.User;
    showSpinner: boolean;
    [key: string]: any;
}

export const INITIAL_STATE: State = {
    todayTodos: [],
    allTodos: [],
    selectedTodo: undefined,
    currentUser: undefined,
    showSpinner: false
};
