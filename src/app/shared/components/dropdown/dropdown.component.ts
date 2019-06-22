import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "ns-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrls: ["./dropdown.component.css"],
    moduleId: module.id
})
export class DropdownComponent implements OnInit {
    @Input() text: string;
    @Input() placeholder: string = "Choose an option";
    @Input() items: any[];

    public showDropdownContent: boolean;

    constructor() {}

    ngOnInit() {}

    public onTap() {
        this.showDropdownContent = !this.showDropdownContent;
    }
}
