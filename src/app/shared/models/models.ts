export interface BaseObject {
    id: number;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
}

export interface Todo extends BaseObject {
    title: string;
    description: string;
    isCompleted: boolean;
    completedOn: Date;
    isFavourite: boolean;
    options: TodoOptions;
}

export interface TodoOptions {
    isAddedToMyDay: boolean;
}
