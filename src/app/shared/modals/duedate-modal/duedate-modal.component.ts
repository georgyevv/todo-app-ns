import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "ns-duedate-modal",
    templateUrl: "./duedate-modal.component.html",
    styleUrls: ["./duedate-modal.component.css"],
    moduleId: module.id
})
export class DuedateModalComponent {
    public todayDate: Date;
    public tommorowDate: Date;
    public firstDayOfNextWeekDate: Date;

    constructor(private params: ModalDialogParams) {
        this.todayDate = new Date();

        this.tommorowDate = new Date();
        this.tommorowDate.setDate(this.todayDate.getDate() + 1);

        this.firstDayOfNextWeekDate = new Date();
        this.firstDayOfNextWeekDate.setDate(this.firstDayOfNextWeekDate.getDate() + ((7 - this.firstDayOfNextWeekDate.getDay()) % 7));
    }

    public onToday() {
        this.params.closeCallback(this.todayDate);
    }

    public onTomorrow() {
        this.params.closeCallback(this.tommorowDate);
    }

    public onNextWeek() {
        this.params.closeCallback(this.firstDayOfNextWeekDate);
    }

    public onNoDate() {
        this.params.closeCallback(undefined);
    }

    public onCancel() {
        this.params.closeCallback(null);
    }
}
