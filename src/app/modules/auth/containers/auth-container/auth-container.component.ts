import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { NavigationService } from "~/app/core/services/navigation.service";
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
    selector: "ns-auth-container",
    templateUrl: "./auth-container.component.html",
    styleUrls: ["./auth-container.component.css"],
    moduleId: module.id
})
export class AuthContainerComponent implements OnInit {
    constructor(
        private readonly page: Page,
        private readonly navigationService: NavigationService,
        private readonly activeRoute: ActivatedRoute) {

        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;
    }

    public ngOnInit() {
        this.navigationService.navigate([{ outlets: { loginTab: ["login"], registerTab: ["register"] } }], {
            relativeTo: this.activeRoute
        });
    }
}
