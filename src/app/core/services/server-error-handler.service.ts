import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ServerErrorHandlerService {
    public handleFirestoreError(error: any) {
        console.error(error);
    }
}
