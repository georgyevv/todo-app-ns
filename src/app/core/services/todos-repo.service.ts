import { Injectable, NgZone } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase/firebase";

import { Todo } from "../models/models";
import { TodosRepository } from "../repositories/todos.repository";
import { Store } from "../state/app-store";
import { ServerErrorHandlerService } from "./server-error-handler.service";

@Injectable()
export class TodosRepoService {
    private fetchedAllTodosList: boolean = false;
    private fetchedTodayTodosList: boolean = false;

    constructor(private repo: TodosRepository, private store: Store, private errorHandlerService: ServerErrorHandlerService, private zone: NgZone) {}

    public fetchTodosList() {
        if (this.fetchedAllTodosList) {
            return;
        }

        this.repo.getTodoList(this.errorHandlerService.handleFirestoreError, (snapshot: firestore.QuerySnapshot) => {
            this.zone.run(() => {
                const todos = [];
                snapshot.forEach(docSnap => {
                    const todo: Todo = <Todo>docSnap.data();
                    todo.id = docSnap.id;
                    todos.push(todo);
                });
                this.store.set("allTodos", todos);
                this.fetchedAllTodosList = true;
            });
        });
    }

    public fetchTodayTodosList() {
        if (this.fetchedTodayTodosList) {
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

                    this.store.set("todayTodos", todos);
                    this.fetchedTodayTodosList = true;
                });
            },
            {
                fieldPath: "isAddedToToday",
                opStr: "==",
                value: true
            }
        );
    }

    public fetchTodoDetails(todoId) {
        this.repo.getTodoDetails(todoId, this.errorHandlerService.handleFirestoreError, (docSnap: firestore.DocumentSnapshot) => {
            this.zone.run(() => {
                if (docSnap.exists) {
                    const todo: Todo = <Todo>docSnap.data();
                    todo.id = docSnap.id;
                    this.store.set("selectedTodo", todo);
                }

                // Throw error?
            });
        });
    }

    public addTodo(todo: Todo) {
        this.repo.addTodo(todo, this.errorHandlerService.handleFirestoreError, (querySnapshot: firestore.DocumentReference) => {
            //console.log("Added todo");
        });
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
