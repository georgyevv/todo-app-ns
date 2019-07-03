import { Injectable, NgZone } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase/firebase";

import { Todo } from "../models/models";
import { TodosRepository } from "../repositories/todos.repository";
import { Store } from "../state/app-store";
import { ServerErrorHandlerService } from "./server-error-handler.service";
import { LoggerService } from "./logger.service";

@Injectable({
    providedIn: "root"
})
export class TodosService {
    private fetchedAllTodosList: boolean = false;
    private fetchedTodayTodosList: boolean = false;

    constructor(private repo: TodosRepository, private store: Store, private errorHandlerService: ServerErrorHandlerService, private zone: NgZone, private loggerService: LoggerService) {}

    public getTodosList() {
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

    public getTodayTodosList() {
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

    public getTodoDetails(todoId) {
        this.repo.getTodoDetails(todoId, this.errorHandlerService.handleFirestoreError, (docSnap: firestore.DocumentSnapshot) => {
            this.zone.run(() => {
                if (docSnap.exists) {
                    const todo: Todo = <Todo>docSnap.data();
                    todo.id = docSnap.id;
                    this.store.set("selectedTodo", todo);
                }

                this.loggerService.error("The searched todo doesn't exists!");
            });
        });
    }

    public addTodo(todo: Todo) {
        this.repo.addTodo(todo, this.errorHandlerService.handleFirestoreError, (querySnapshot: firestore.DocumentReference) => {
            this.loggerService.log("Added todo");
        });
    }

    public updateTodo(todo: Todo) {
        this.repo.updateTodo(todo, this.errorHandlerService.handleFirestoreError, () => {
            this.loggerService.log("Updated todo");
        });
    }

    public deleteTodo(todoId) {
        this.repo.deleteTodo(todoId, this.errorHandlerService.handleFirestoreError, () => {
            this.loggerService.log("Deleted todo");
        });
    }
}
