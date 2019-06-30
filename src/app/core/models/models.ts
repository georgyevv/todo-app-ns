export class Todo {
    constructor(
        public id: string,
        public createdOn: Date,
        public createdBy: string,
        public modifiedOn: Date,
        public modifiedBy: string,
        public title: string,
        public description: string,
        public isCompleted: boolean,
        public completedOn: Date,
        public isAddedToToday: boolean,
        public isAddedToImportant: boolean,
        public repeatType: number,
        public dueDate: Date,
        public priority: number,
        public parent: Todo,
    ) {}
}

export enum RepeatType {
    Daily,
    Weekdays,
    Weekly,
    Monthly,
    Yearly,
    Custom
}

export class LoginUser {
    constructor(
        public email: string,
        public password: string
    ) {}
}

export class RegisterUser {
    constructor(
        public email: string,
        public password: string,
        public confirmPassword: string
    ) {}
}
