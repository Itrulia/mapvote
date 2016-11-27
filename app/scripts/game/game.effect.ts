import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {fromPromise} from "rxjs/observable/fromPromise";
import {of} from "rxjs/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/skip";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";

import * as game from "./game.action";
import {AngularFire} from "angularfire2";
import {NoopAction} from "../action";

@Injectable()
export class GameEffects {
    constructor(private actions$: Actions, private af: AngularFire) {}

    @Effect()
    public load$: Observable<Action> = this.actions$
        .ofType(game.ActionTypes.LOAD)
        .switchMap((action: game.LoadGamesAction) => {
            const nextSearch$ = this.actions$.ofType(game.ActionTypes.LOAD).skip(1);

            return this.af.database.list("/games")
                .takeUntil(nextSearch$)
                .map(games => new game.LoadGamesCompleteAction(games))
                .catch(() => of(new game.LoadGamesCompleteAction(null)));
        }) as Observable<Action>;

    @Effect()
    public select$: Observable<any> = this.actions$
        .ofType(game.ActionTypes.SELECT)
        .switchMap((action: game.SelectGameAction) => {
            const nextSearch$ = this.actions$.ofType(game.ActionTypes.SELECT).skip(1);

            return this.af.database.object(`/games/${action.key}`)
                .takeUntil(nextSearch$)
                .map(gameObj => new game.SelectedGameAction(gameObj))
                .catch(() => of(new game.SelectedGameAction(null)));
        }) as Observable<Action>;

    @Effect()
    public create$: Observable<any> = this.actions$
        .ofType(game.ActionTypes.CREATE)
        .switchMap((action: game.CreateGameAction) => {
            return fromPromise<any>(this.af.database.list("/games").push(action.payload) as Promise)
                .map(() => new NoopAction());
        }) as Observable<any>;

    @Effect()
    public update$: Observable<any> = this.actions$
        .ofType(game.ActionTypes.UPDATE)
        .switchMap((action: game.UpdateGameAction) => {
            return fromPromise<any>(this.af.database.list("/games").update(action.key, action.payload) as Promise)
                .map(() => new NoopAction());
        }) as Observable<any>;

    @Effect()
    public delete$: Observable<any> = this.actions$
        .ofType(game.ActionTypes.DELETE)
        .switchMap((action: game.DeleteGameAction) => {
            return fromPromise<any>(this.af.database.list("/games").remove(action.key) as Promise)
                .map(() => new NoopAction());
        }) as Observable<any>;
}