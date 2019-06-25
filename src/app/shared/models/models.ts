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
        public isAddedToMyDay: boolean,
        public isAddedToImportant: boolean) {
        }
}
