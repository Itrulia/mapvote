import {Component, ViewChild, ElementRef, Renderer, AfterViewInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../../../reducers";
import {OpenSidenavAction} from "./navigation.action";

@Component({
    selector: "toolbar",
    template: require("./toolbar.component.html")
})
export class ToolbarComponent implements AfterViewInit {
    @ViewChild("menuButton")
    public menuButton: ElementRef;

    constructor(private renderer: Renderer, private store: Store<State>) {
    }

    public ngAfterViewInit() {
        this.renderer.listen(this.menuButton.nativeElement, "click", (e) => {
            e.stopPropagation();
        });
    }

    public openMenu() {
        this.store.dispatch(new OpenSidenavAction());
    }
}