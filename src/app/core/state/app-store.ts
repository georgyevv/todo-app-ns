import { BehaviorSubject, Observable } from "rxjs";
import { pluck, distinctUntilChanged } from "rxjs/operators";

import { INITIAL_STATE, State, StateKey } from "./app-state";

export class Store {
    private state = new BehaviorSubject<State>(INITIAL_STATE);

    public select<T>(name: StateKey): Observable<T> {
        return this.state.pipe(
            pluck<State, T>(name),
            distinctUntilChanged<T>()
        );
    }

    get value() {
        return this.state.value;
    }

    public set<T>(name: StateKey, state: T) {
        this.state.next({
            ...this.value,
            [name]: state
        });
    }
}
