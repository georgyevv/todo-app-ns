import { Injectable, NgZone } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase/firebase";

import { Todo } from "../models/models";
import { TodosRepository } from "../repositories/todos.repository";
import { Store } from "../state/app-store";
import { ServerErrorHandlerService } from "./server-error-handler.service";

@Injectable()
export class TodosRepoService {
    private fetchedAllTodosList: boolean = false;
    private fetchedMyDayTodosList: boolean = false;
    private fetchedImportantTodosList: boolean = false;

    constructor(
        private repo: TodosRepository,
        private store: Store,
        private errorHandlerService: ServerErrorHandlerService,
        private zone: NgZone) {}

    public fetchTodosList() {
        if (this.fetchedAllTodosList) {
            return;
        }

        this.repo.getTodoList(
            this.errorHandlerService.handleFirestoreError,
            (snapshot: firestore.QuerySnapshot) => {
                this.zone.run(() => {
                    const todos = [];
                    snapshot.forEach(docSnap => {
                        const todo: Todo = <Todo>docSnap.data();
                        todo.id = docSnap.id;
                        todos.push(todo);
                    });
                    //console.log("Fetch all todos list", todos);
                    this.store.set("tasks", todos);
                    this.fetchedAllTodosList = true;
                });
        });
    }

    public fetchMyDayTodosList() {
        if (this.fetchedMyDayTodosList) {
            return;
        }

        this.repo.getTodoList(
            this.errorHandlerService.handleFirestoreError,
            (snapshot: firestore.QuerySnapshot) => {
                this.zone.run(() => {
                    const todos = [];
                    snapshot.forEach(docSnap => {
                        const todo: Todo = <Todo>docSnap.data();
                        todo.id = docSnap.id;
                        todos.push(todo);
                    });
                    //console.log("Fetch my day todos list", todos);
                    this.store.set("myDayTodos", todos);
                    this.fetchedMyDayTodosList = true;
                });
            },
            {
                fieldPath: "isAddedToMyDay",
                opStr: "==",
                value: true
            }
        );
    }

    public fetchImportantTodosList() {
        if (this.fetchedImportantTodosList) {
            return;
        }

        this.repo.getTodoList(
            this.errorHandlerService.handleFirestoreError,
            (snapshot: firestore.QuerySnapshot) => {
                this.zone.run(() => {
                    const todos = [];
                    snapshot.forEach(docSnap => {
                        const todo: Todo = <Todo>docSnap.data();
                        todo.id = docSnap.id;
                        todos.push(todo);
                    });
                    //console.log("Fetch important todos list", todos);
                    this.store.set("importantTodos", todos);
                    this.fetchedImportantTodosList = true;
                });
            },
            {
                fieldPath: "isAddedToImportant",
                opStr: "==",
                value: true
            }
        );
    }

    public fetchTodoDetails(todoId) {
        this.repo.getTodoDetails(
            todoId,
            this.errorHandlerService.handleFirestoreError,
            (docSnap: firestore.DocumentSnapshot) => {
                this.zone.run(() => {
                    if (docSnap.exists) {
                        const todo: Todo = <Todo>docSnap.data();
                        todo.id = docSnap.id;
                        //console.log("Fetch todo details", todo);
                        this.store.set("selectedTodo", todo);
                    }

                    // Throw error?
                });
        });
    }

    public addTodo(todo: Todo) {
        this.repo.addTodo(todo, this.errorHandlerService.handleFirestoreError, (querySnapshot: firestore.DocumentReference) => {
            //console.log("Added todo");
        })
    }

    public updateTodo(todo: Todo) {
        this.repo.updateTodo(todo, this.errorHandlerService.handleFirestoreError, () => {
            //console.log("Updated todo");
        });
    }

    public deleteTodo(todoId) {
        this.repo.deleteTodo(todoId, this.errorHandlerService.handleFirestoreError, () => {
            //console.log("Deleted todo: " + todoId);
        });
    }
}
