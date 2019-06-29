import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase/app";
import { firestore } from "nativescript-plugin-firebase/firebase";
import { Todo } from '../models/models';

export interface FirestoreFilter {
    fieldPath: string,
    opStr: firestore.WhereFilterOp,
    value: any
}

@Injectable()
export class TodosRepository {
    private readonly todosRef: firestore.CollectionReference = firebase.firestore().collection("todos");

    public getTodoList(
        errorHandler: (error: any) => any,
        successHandler: (querySnapshot: firestore.QuerySnapshot) => void,
        filter?: FirestoreFilter): void {

        if (filter) {
            this.todosRef
                .where(filter.fieldPath, filter.opStr, filter.value)
                .onSnapshot(successHandler, errorHandler);
        } else {
            this.todosRef.onSnapshot(successHandler, errorHandler);
        }
    }

    public getTodoDetails(
        todoId: string,
        errorHandler: (error: any) => any,
        successHandler: (querySnapshot: firestore.DocumentSnapshot) => void) {

        this.todosRef
            .doc(todoId)
            .get()
            .then(successHandler)
            .catch(errorHandler);
    }

    public addTodo(todo: Todo,
        errorHandler: (error: any) => any,
        successHandler: (querySnapshot: firestore.DocumentReference) => void) {

        this.todosRef
            .add(todo)
            .then(successHandler)
            .catch(errorHandler);
    }

    public updateTodo(todo: Todo,
        errorHandler: (error: any) => any,
        successHandler: () => void) {

        this.todosRef
            .doc(todo.id)
            .update(todo)
            .then(successHandler)
            .catch(errorHandler);
    }

    public deleteTodo(
        todoId: string,
        errorHandler: (error: any) => any,
        successHandler: () => void) {

        this.todosRef
            .doc(todoId)
            .delete()
            .then(successHandler)
            .catch(errorHandler);
    }
}
