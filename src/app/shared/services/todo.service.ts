import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, flatMap } from "rxjs/operators";
import { Todo, TodoOptions } from "../models/models";

@Injectable({
    providedIn: "root"
})
export class TodoService {
    private rawTodoItems: Todo[] = [];
    private todoItems$$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

    constructor() {
        const todoItems = [];
        for (let index = 0; index < 10; index++) {
            todoItems.push({
                id: index,
                title: "New test todo " + index,
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                createdOn: new Date(),
                createdBy: "Jordan Georgiev " + index,
                modifiedOn: new Date(),
                modifiedBy: "Jordan Georgiev " + index,
                options: {} as TodoOptions
            } as Todo);
        }

        this.rawTodoItems = todoItems;
        this.todoItems$$.next(todoItems);
    }

    public getTodos(): Observable<Todo[]> {
        return this.todoItems$$.asObservable();
    }

    public getTodo(id: number): Observable<Todo> {
        return this.todoItems$$.asObservable().pipe(
            flatMap(todo => todo),
            filter((todo: Todo) => todo.id == id)
        );
    }

    public deleteTodo(id: number) {
        const items = this.rawTodoItems.filter((todo: Todo) => todo.id !== id);
        this.todoItems$$.next(items);
        this.rawTodoItems = items;
    }

    public addTodo(todo: Todo) {
        this.rawTodoItems.push(todo);
        this.todoItems$$.next(this.rawTodoItems);
    }
}
