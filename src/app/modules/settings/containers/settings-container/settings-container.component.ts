import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "ns-settings-container",
    templateUrl: "./settings-container.component.html",
    styleUrls: ["./settings-container.component.css"],
    moduleId: module.id
})
export class SettingsContainerComponent implements OnInit {
    constructor(private readonly page: Page) {
        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;
    }

    ngOnInit() {}
}
