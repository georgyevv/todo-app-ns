import { Injectable } from "@angular/core";

@Injectable()
export class ServerErrorHandlerService {
    constructor() {}

    public handleFirestoreError(error: any) {
        return new Error("WTF");
    }
}
