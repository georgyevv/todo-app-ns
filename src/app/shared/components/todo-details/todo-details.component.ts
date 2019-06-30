import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Button } from "tns-core-modules/ui/button";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";
import { screen } from "tns-core-modules/platform";

import { Todo } from "~/app/core/models/models";
import { NavigationService } from "~/app/core/services/navigation.service";
import { TodosRepoService } from '~/app/core/services/todos-repo.service';

@Component({
    selector: "ns-todo-details",
    templateUrl: "./todo-details.component.html",
    styleUrls: ["./todo-details.component.css"],
    moduleId: module.id
})
export class TodoDetailsComponent implements OnInit {
    @ViewChild("saveButton", { static: false }) set saveButton(content: ElementRef) {
        if (content) {
            const button = <Button>content.nativeElement;
            AbsoluteLayout.setTop(button, 125);
            AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 20);
        }
    }

    public todo: Todo;

    constructor(
        private route: ActivatedRoute,
        private readonly navigationService: NavigationService,
        private readonly todosRepoService: TodosRepoService) {

        }

    public ngOnInit() {
        const id = this.route.snapshot.paramMap.get("id");
        this.todosRepoService.fetchTodoDetails(id);
    }

    public onSave() {
        this.todosRepoService.updateTodo(this.todo);
        this.goBack();
    }

    public goBack() {
        this.navigationService.back();
    }

    public onDelete() {}
}
