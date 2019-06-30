import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "friendlyDate"
})
export class FriendlyDatePipe implements PipeTransform {
    private monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    private weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    public transform(date: Date, type: string = "due") {
        if (date === null || date === undefined) {
            return date;
        }

        if (type == "due") {
            const currentDate = new Date();
            if (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate()) {
                return "Today";
            }
            if (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate() + 1) {
                return "Tommorow";
            }

            if (date.getFullYear() === currentDate.getFullYear()) {
                return `${this.weekdays[date.getDay()].substr(0, 3)}, ${this.monthNames[date.getMonth()]} ${date.getDate()}`;
            }

            return `${this.weekdays[date.getDay()].substr(0, 3)}, ${this.monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        }

        if (type == "dayOfWeek") {
            return `${this.weekdays[date.getDay()].substr(0, 3)}`;
        }

        return date;
    }
}
