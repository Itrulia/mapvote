import {Component} from "@angular/core";
import {State} from "../reducers";
import {Store} from "@ngrx/store";
import "rxjs/add/operator/let";
import "rxjs/add/operator/skip";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";
import {Map, Game} from "../game/game.model";
import {MapVote, Vote} from "./mapvote.model";
import {LoadMapAction} from "./mapvote.action";
import {SelectGameAction} from "../game/game.action";
import {getSelectedGame} from "../game/game.reducer";
import {getMapVote} from "./mapvote.reducer";

@Component({
    template: require("./observer.component.html")
})
export class ObserverComponent {
    public game: Game;
    public mapVote: MapVote;

    constructor(private store: Store<State>) {
        this.store.let(getMapVote).subscribe((mapvote: MapVote) => {
            if (mapvote) {
                this.store.dispatch(new SelectGameAction(mapvote.gameId));
            }

            this.mapVote = mapvote;
        });

        this.store.let(getSelectedGame).subscribe((game: Game) => {
            this.game = game;
        });

        this.store.dispatch(new LoadMapAction());
    }

    public isBanPhase(): boolean {
        if (!this.mapVote) {
            return true;
        }

        return !this.mapVote.banned || ((this.game.maps.length - this.mapVote.banned.length) > this.mapVote.bestOf);
    }

    public isPickPhase(): boolean {
        const isBanPhase = this.isBanPhase();

        if (isBanPhase) {
            return false;
        }

        return !this.mapVote.selected || (this.mapVote.banned.length + this.mapVote.selected.length) < this.game.maps.length;
    }

    public isBanned(map: Map): boolean {
        if (!this.mapVote || !map) {
            return false;
        }

        return Boolean(this.mapVote.banned && this.mapVote.banned.filter((vote: Vote) => vote.name === map.name).length);
    }

    public isSelected(map: Map): boolean {
        if (!this.mapVote || !map) {
            return false;
        }

        return Boolean(this.mapVote.selected && this.mapVote.selected.filter((vote: Vote) => vote.name === map.name).length);
    }

    public getMapByIndex(index: number) {
        if (!this.mapVote || !this.game || !this.mapVote.banned) {
            return null;
        }

        let selectedLength = this.mapVote.selected ? this.mapVote.selected.length : 0;

        if (index > (this.mapVote.banned.length + selectedLength - 1)) {
            return null;
        }

        let map;

        if (index <= this.mapVote.banned.length - 1) {
             map = this.mapVote.banned[index].name;
        } else {
            map = this.mapVote.selected[index - this.mapVote.banned.length].name;
        }

        return this.game.maps.filter((gameMap: Map) => {
            return gameMap.name === map;
        }).pop();
    }

    public getMapByName(name: string) {
        if (!this.game) {
            return;
        }

        return this.game.maps.filter((map: Map) => {
            return map.name === name;
        }).pop();
    }
}