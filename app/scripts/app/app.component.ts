import {Component} from "@angular/core";
import {AngularFire, FirebaseAuthState} from "angularfire2";
import {User} from "firebase";
import {State} from "../reducers";
import {Store} from "@ngrx/store";
import "rxjs/add/operator/let";
import {getShowSidenav} from "./components/navigation/navigation.reducer";
import {LoadGamesAction} from "../game/game.action";
import {Game} from "../game/game.model";
import {getSelectedGame} from "../game/game.reducer";

@Component({
    selector: "my-app",
    template: require("./app.component.html"),
    styles: [`
        :host {
            position: relative;
            display: flex; 
            flex-flow: column; 
            align-items: center;
            min-height: 100%;
        }
    `]
})
export class AppComponent {
    public user: User;
    public showSidenav: boolean;
    public selectedGame: Game;

    constructor(private af: AngularFire, private store: Store<State>) {
        this.store.let(getShowSidenav).subscribe((isOpen) => this.showSidenav = isOpen);
        this.store.let(getSelectedGame).subscribe((selectedGame) => this.selectedGame = selectedGame);
        this.store.dispatch(new LoadGamesAction());
    }

    public ngOnInit() {
        this.af.auth.subscribe((auth: FirebaseAuthState) => {
            if (auth) {
                this.user = auth.auth;
            } else {
                this.user = null;
            }
        });
    }
}