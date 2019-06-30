import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { Button } from "tns-core-modules/ui/button";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";
import { screen } from "tns-core-modules/platform";

import { Todo } from "~/app/core/models/models";

@Component({
    selector: "ns-details-form",
    templateUrl: "./details-form.component.html",
    styleUrls: ["./details-form.component.css"],
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsFormComponent {
    public todo: Todo;

    @ViewChild("saveButton", { static: false }) set saveButton(content: ElementRef) {
        if (content) {
            const button = <Button>content.nativeElement;
            AbsoluteLayout.setTop(button, 125);
            AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 20);
        }
    }

    @Input() set model(model: Todo) {
        console.log(model);
        this.todo = model;
    }
    @Output() save: EventEmitter<Todo> = new EventEmitter<Todo>();
    @Output() delete: EventEmitter<void> = new EventEmitter<void>();

    public onSave() {
        this.save.emit(this.todo);
    }

    public onDelete() {
        this.delete.emit();
    }
}
