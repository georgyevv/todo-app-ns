import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase/app";
import { firestore } from "nativescript-plugin-firebase/firebase";
import { Observable } from "rxjs";

import { Todo } from "../models/models";

@Injectable({
    providedIn: "root"
})
export class TodoService {
    private readonly todosRef: firestore.CollectionReference = firebase.firestore().collection("todos");

    constructor(private ngZone: NgZone) {}

    public get getTodos$(): Observable<Todo[]> {
        console.log("getTodos");

        const observable = Observable.create(subscriber => {
            this.todosRef.onSnapshot((snapshot: firestore.QuerySnapshot) => {
                this.ngZone.run(() => {
                    const todos = [];
                    snapshot.forEach(docSnap => {
                        const todo: Todo = <Todo>docSnap.data();
                        todo.id = docSnap.id;
                        todos.push(todo);
                    });
                    subscriber.next(todos);
                });
            });
        });

        return observable;
    }

    public get getMyDayTodos$(): Observable<Todo[]> {
        console.log("getMyDayTodos");

        const observable = Observable.create(subscriber => {
            this.todosRef.where("isAddedToMyDay", "==", true).onSnapshot((snapshot: firestore.QuerySnapshot) => {
                this.ngZone.run(() => {
                    const todos = [];
                    snapshot.forEach(docSnap => {
                        const todo: Todo = <Todo>docSnap.data();
                        todo.id = docSnap.id;
                        todos.push(todo);
                    });
                    subscriber.next(todos);
                });
            });
        });

        return observable;
    }

    public get importantTodos$(): Observable<Todo[]> {
        console.log("getImportantTodos");

        const observable = Observable.create(subscriber => {
            this.todosRef.where("isAddedToImportant", "==", true).onSnapshot((snapshot: firestore.QuerySnapshot) => {
                this.ngZone.run(() => {
                    const todos = [];
                    snapshot.forEach(docSnap => {
                        const todo: Todo = <Todo>docSnap.data();
                        todo.id = docSnap.id;
                        todos.push(todo);
                    });
                    subscriber.next(todos);
                });
            });
        });

        return observable;
    }

    public getTodo(id: string): Observable<Todo> {
        console.log("getTodo");
        const observable = Observable.create(subscriber => {
            this.todosRef.doc(id).onSnapshot((docSnap: firestore.DocumentSnapshot) => {
                this.ngZone.run(() => {
                    if (docSnap.exists) {
                        const todo: Todo = <Todo>docSnap.data();
                        todo.id = docSnap.id;
                        subscriber.next(todo);
                    } else {
                        subscriber.next(undefined);
                    }
                });
            });
        });

        return observable;
    }

    public addTodo(todo: Todo) {
        console.log("addTodo");
        this.todosRef.add(todo);
    }

    public updateTodo(todo: Todo): void {
        console.log("updateTodo");
        this.todosRef
            .doc(todo.id)
            .update(todo)
            .then(() => {
                console.log("document succ updated");
            });
    }

    public deleteTodo(id: string) {
        console.log("deleteTodo");
        this.todosRef
            .doc(id)
            .delete()
            .then(() => {
                console.log("document succ deleted");
            });
    }
}
