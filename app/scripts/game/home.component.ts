import {Component} from "@angular/core";
import {State} from "../reducers";
import {Store} from "@ngrx/store";
import {getGames} from "./game.reducer";
import "rxjs/add/operator/let";
import {Observable} from "rxjs/Observable";
import {Game} from "./game.model";
import {SelectGameAction} from "./game.action";

@Component({
    template: require("./home.component.html")
})
export class HomeComponent {
    public games$: Observable<Game[]>;

    constructor(private store: Store<State>) {
        this.games$ = this.store.let(getGames);
        this.store.dispatch(new SelectGameAction(null));
    }
}