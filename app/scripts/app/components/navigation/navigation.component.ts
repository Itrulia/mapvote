import {Component, Renderer, Input, ViewChild, AfterViewInit, ElementRef} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {AngularFire} from "angularfire2";
import {User} from "firebase";
import {Store} from "@ngrx/store";
import {State} from "../../../reducers";
import {getShowSidenav} from "./navigation.reducer";
import {CloseSidenavAction} from "./navigation.action";

@Component({
    selector: "navigation",
    template: require("./navigation.component.html")
})
export class NavigationComponent implements AfterViewInit {
    @ViewChild("navigation")
    public navigation: ElementRef;

    @Input()
    public user: User;

    public showSidenav: boolean;

    constructor(private router: Router, private renderer: Renderer, private af: AngularFire, private store: Store<State>) {
        this.store.let(getShowSidenav).subscribe((isOpen: boolean) => this.showSidenav = isOpen);

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationStart) {
                this.store.dispatch(new CloseSidenavAction());
            }
        });
    }

    public ngAfterViewInit() {
        this.renderer.listen(document.querySelector("body"), "click", (e) => {
            if (this.showSidenav) {
                this.closeMenu();
            }
        });

        this.renderer.listen(this.navigation.nativeElement, "click", (e) => {
            e.stopPropagation();
        });
    }

    public closeMenu() {
        this.store.dispatch(new CloseSidenavAction());
    }

    public login() {
        this.af.auth.login();
    }
}