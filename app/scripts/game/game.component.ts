import {Component, Input} from "@angular/core";
import {Game} from "./game.model";
import {State} from "../reducers";
import {Store} from "@ngrx/store";
import {go} from "@ngrx/router-store";

@Component({
    selector: "game",
    template: require("./game.component.html")
})
export class GameComponent {
    @Input()
    public game: Game;

    constructor(private store: Store<State>) {}

    public editGame($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.store.dispatch(go(["/game", this.game.$key, "edit"]));
    }
}