import { Injectable } from "@angular/core";
import { CanActivate, CanLoad } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private routerExtensions: RouterExtensions, private authService: AuthService) {}

    public canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.routerExtensions.navigate(["/auth"], {
                clearHistory: true
            });
            return false;
        }
    }

    public canLoad(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.routerExtensions.navigate(["/auth"], {
                clearHistory: true
            });
            return false;
        }
    }
}
