import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
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
import {
    DeselectMapAction, UnbanMapAction, BanMapAction, SelectMapAction,
    LoadMapAction, ResetMapAction, UpdateMapAction
} from "./mapvote.action";
import {SelectGameAction} from "../game/game.action";
import {getSelectedGame} from "../game/game.reducer";
import {getMapVote} from "./mapvote.reducer";
import {go} from "@ngrx/router-store";
import {Observable} from "rxjs/Observable";
import {removeFirebaseProperties} from "../util";

@Component({
    template: require("./mapvote.component.html")
})
export class MapvoteComponent {
    public game: Game;
    public mapVote: MapVote;

    constructor(private route: ActivatedRoute, private store: Store<State>) {
        this.store.let(getMapVote).subscribe((mapvote: MapVote) => {
            // navigate when mapvote game changed
            if (this.mapVote && this.mapVote.gameId !== mapvote.gameId) {
                this.store.dispatch(go(["/mapvote", mapvote.gameId]));
            }

            this.mapVote = mapvote;
        });

        this.isGameDifferent().subscribe((different: boolean) => {
            if (different) {
                const mapVoteClone = Object.assign({}, this.mapVote, {selected: [], banned: [], gameId: this.game.$key});
                this.store.dispatch(new UpdateMapAction(removeFirebaseProperties(mapVoteClone)));
            }
        });

        this.store.let(getSelectedGame).subscribe((game: Game) => {
            this.game = game;
        });

        this.route.params.subscribe((params: Params) => {
            this.store.dispatch(new SelectGameAction(params["id"]));
        });

        this.store.dispatch(new LoadMapAction());
    }

    public isGameDifferent(): Observable<boolean> {
        return this.store.let(getMapVote).skip(1)
            .switchMap((mapvote: MapVote) => {
                return this.store.let(getSelectedGame)
                    .map((game: Game) => {
                        return mapvote && game && mapvote.gameId !== game.$key;
                    });
            })
            .take(1);
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

    public reset(): void {
        if (confirm("Are you sure you want to reset?")) {
            this.store.dispatch(new ResetMapAction());
        }
    }

    /**
     * Bans or picks a map, depending on the current phase
     * @param map
     */
    public selectMap(map: Map): void {
        // already banned
        if (this.isBanned(map)) {
            this.store.dispatch(new UnbanMapAction(map));
            return;
        }

        // already selected
        if (this.isSelected(map)) {
            this.store.dispatch(new DeselectMapAction(map));
            return;
        }

        if (this.isBanPhase()) {
            this.store.dispatch(new BanMapAction(map));
            return;
        }

        this.store.dispatch(new SelectMapAction(map));
    }

    public changeBestOf(bestOf) {
        if (!this.mapVote) {
            return;
        }

        const mapVoteClone = Object.assign({}, this.mapVote, {selected: [], banned: [], bestOf: parseInt(bestOf, 10)});
        this.store.dispatch(new UpdateMapAction(removeFirebaseProperties(mapVoteClone)));
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