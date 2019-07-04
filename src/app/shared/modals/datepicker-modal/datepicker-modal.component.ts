import { Component } from "@angular/core";
import { DatePicker } from "tns-core-modules/ui/date-picker/date-picker";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "ns-datepicker-modal",
    templateUrl: "./datepicker-modal.component.html",
    styleUrls: ["./datepicker-modal.component.scss"],
    moduleId: module.id
})
export class DatepickerModalComponent {
    private year: number;
    private month: number;
    private day: number;

    constructor(private params: ModalDialogParams) {}

    public onPickerLoaded(args) {
        const currentDate = new Date();

        let datePicker = <DatePicker>args.object;

        this.year = currentDate.getFullYear();
        this.month = currentDate.getMonth();
        this.day = currentDate.getDate();

        datePicker.year = currentDate.getFullYear();
        datePicker.month = currentDate.getMonth();
        datePicker.day = currentDate.getDate();
        datePicker.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        datePicker.maxDate = new Date(2045, 4, 12);
    }

    public onDayChanged(args) {
        this.day = args.value;
    }

    public onMonthChanged(args) {
        this.month = args.value - 1;
    }

    public onYearChanged(args) {
        this.year = args.value;
    }

    public onSave() {
        const date = new Date(this.year, this.month, this.day);
        this.params.closeCallback(date);
    }

    public onCancel() {
        this.params.closeCallback(null);
    }
}
