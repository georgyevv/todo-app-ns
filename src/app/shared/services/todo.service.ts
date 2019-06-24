import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, BehaviorSubject } from "rxjs";
import { filter, flatMap, pairwise, tap, map } from "rxjs/operators";
import { Todo, TodoOptions } from "../models/models";
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class TodoService {
    private baseUrl: string = "https://ns-todo-c6003.firebaseio.com/";
    private collectionUrl: string = "todos.json";

    constructor(private http: HttpClient) {
    }

    public getTodos(): Observable<Todo[]> {
        return this.http.get(this.baseUrl + this.collectionUrl).pipe(map((data: any[]) => {
            console.log(data);
            return data.map((todo: any) => {
                console.log(todo);
                return todo as Todo;
            });
        }));
    }

    public getMyDayTodos(): Observable<Todo[]> {
        console.log('getMyDayTodos');

        return this.getTodos();
        // return this.getTodos().pipe(
        //     flatMap(todo => todo),
        //     filter((item: Todo) => item.options.isAddedToMyDay === true),
        //     pairwise()
        // );
    }

    public getImportantTodos(): Observable<Todo[]> {
        console.log('getImportantTodos');

        return this.getTodos();
        // return this.getTodos().pipe(
        //     flatMap(todo => todo),
        //     filter((item: Todo) => item.options.isAddedToImportant === true),
        //     pairwise(),
        // );
    }

    public getTodo(id: number): Observable<Todo> {
        console.log('getTodo');

        return this.getTodos().pipe(
            flatMap(todo => todo),
            filter((todo: Todo) => todo.id == id)
        );
    }

    public addTodo(todo: Todo) {
        console.log('addTodo');

        this.http.post(this.baseUrl + this.collectionUrl, todo).subscribe(response => {
            console.log(response);
        })
    }

    public updateTodo(todo: Todo): void {
        console.log('updateTodo');

        this.http.put(this.baseUrl + this.collectionUrl, todo).subscribe(response => {
            console.log(response);
        })
    }

    public deleteTodo(id: number) {
        console.log('deleteTodo');
        // this.http.delete(this.baseUrl + "todos.json", )
        // const items = this.rawTodoItems.filter((todo: Todo) => todo.id !== id);
        // this.rawTodoItems = items;
        // this.todoItems$$.next(items);
    }
}
