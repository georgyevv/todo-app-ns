import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";

import { Store } from "~/app/core/state/app-store";
import { AuthRepository } from "./auth.repository.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private readonly store: Store, private readonly repo: AuthRepository, private ngZone: NgZone) {}

    public isLoggedIn(): boolean {
        return this.store.value.currentUser !== undefined;
    }

    public login(email: string, password: string): Observable<void> {
        const observable = Observable.create(subscriber => {
            this.repo
                .login(email, password)
                .then(user => {
                    this.ngZone.run(() => {
                        this.store.set("currentUser", user);
                        subscriber.next();
                    });
                })
                .catch(error => subscriber.error(error));
        });

        return observable;
    }

    public register(email: string, password: string): Observable<void> {
        const observable = Observable.create(subscriber => {
            this.repo
                .register(email, password)
                .then(user => {
                    this.ngZone.run(() => {
                        this.store.set("currentUser", user);
                        subscriber.next();
                    });
                })
                .catch(error => subscriber.error(error));
        });

        return observable;
    }

    public logOut(): Promise<void> {
        this.store.set("currentUser", undefined);

        return firebase.logout();
    }
}
