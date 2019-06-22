import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Todo } from '~/app/shared/models/models';
import { TodoService } from '~/app/shared/services/todo.service';

@Component({
    selector: "ns-todo-details",
    templateUrl: "./todo-details.component.html",
    styleUrls: ["./todo-details.component.css"],
    moduleId: module.id
})
export class TodoDetailsComponent implements OnInit {
    public todo: Todo;

    constructor(private route: ActivatedRoute,
                private readonly routerExtensions: RouterExtensions,
                private readonly todoService: TodoService) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get("id");
        this.todoService.getTodo(Number(id)).subscribe((todo: Todo) => {
            this.todo = todo;
        });
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onToggleAddToMyDay(): void {
        this.todo.options.isAddedToMyDay = !this.todo.options.isAddedToMyDay;
    }

    public onDelete(): void {
        this.todoService.deleteTodo(this.todo.id);
        this.routerExtensions.back();
    }
}
