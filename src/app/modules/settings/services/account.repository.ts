import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";

@Injectable()
export class AccountRepository {
    public updateProfileIMG(photoURL: string, errorHandler: (error: any) => any, successHandler: () => any): void {
        firebase
            .updateProfile({ photoURL: photoURL })
            .then(successHandler)
            .catch(errorHandler);
    }

    public updateDisplayName(displayName: string, errorHandler: (error: any) => any, successHandler: () => any): void {
        firebase
            .updateProfile({ displayName: displayName })
            .then(successHandler)
            .catch(errorHandler);
    }

    public updateEmail(email: string, errorHandler: (error: any) => any, successHandler: () => any): void {
        firebase
            .updateEmail(email)
            .then(successHandler)
            .catch(errorHandler);
    }

    public updatePassword(password: string, errorHandler: (error: any) => any, successHandler: () => any): void {
        firebase
            .updatePassword(password)
            .then(successHandler)
            .catch(errorHandler);
    }

    public deleteAccount(errorHandler: (error: any) => any, successHandler: () => any): void {
        firebase.deleteUser().then(successHandler).catch(errorHandler);
    }
}
