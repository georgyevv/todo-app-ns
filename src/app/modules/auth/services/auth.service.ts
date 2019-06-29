import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Store } from "~/app/core/state/app-store";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private readonly store: Store) {}

    public isLoggedIn(): boolean {
        return this.store.value.currentUser !== undefined;
    }

    public login(email: string, password: string): Promise<firebase.User> {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: email,
                password: password
            }
        });
    }

    public register(email: string, password: string): Promise<firebase.User> {
        return firebase.createUser({ email: email, password: password });
    }

    public signOut(): Promise<void> {
        return firebase.logout();
    }
}
