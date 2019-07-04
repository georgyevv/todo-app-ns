import { Component, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService, ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatepickerModalComponent } from '../datepicker-modal/datepicker-modal.component';

@Component({
    selector: "ns-duedate-modal",
    templateUrl: "./duedate-modal.component.html",
    styleUrls: ["./duedate-modal.component.scss"],
    moduleId: module.id
})
export class DuedateModalComponent {
    public todayDate: Date;
    public tommorowDate: Date;
    public firstDayOfNextWeekDate: Date;

    constructor(
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly params: ModalDialogParams) {

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

    public async onPickADate() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {},
            fullscreen: false
        };
        const dueDate = await this.modalService.showModal(DatepickerModalComponent, options);
        if (dueDate) {
            this.params.closeCallback(dueDate);
        }
    }

    public onNoDate() {
        this.params.closeCallback(null);
    }

    public onCancel() {
        this.params.closeCallback(undefined);
    }
}
