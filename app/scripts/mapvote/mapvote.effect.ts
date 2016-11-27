import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {State} from "../reducers";
import {Observable} from "rxjs/Observable";
import {fromPromise} from "rxjs/observable/fromPromise";
import {of} from "rxjs/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/skip";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

import * as mapvote from "./mapvote.action";
import {AngularFire} from "angularfire2";
import {getMapVote} from "./mapvote.reducer";
import {MapVote} from "./mapvote.model";
import {removeFirebaseProperties} from "../util";
import {NoopAction} from "../action";

@Injectable()
export class MapVoteEffects {
    private key = "-KWwY94F0dXguCID_Z6z";

    constructor(private actions$: Actions, private store: Store<State>, private af: AngularFire) {}

    @Effect()
    public load$: Observable<Action> = this.actions$
        .ofType(mapvote.ActionTypes.LOAD)
        .switchMap((action: mapvote.LoadMapAction) => {
            const nextSearch$ = this.actions$.ofType(mapvote.ActionTypes.LOAD).skip(1);

            return this.af.database.object(`/mapvotes/${this.key}`)
                .takeUntil(nextSearch$)
                .map(mapvoteObj => new mapvote.LoadedMapAction(mapvoteObj))
                .catch(() => of(new mapvote.LoadedMapAction(null)));
        }) as Observable<Action>;

    @Effect()
    public update$: Observable<any> = this.actions$
        .ofType(mapvote.ActionTypes.UPDATE)
        .switchMap((action: mapvote.UpdateMapAction) => {
            return fromPromise<any>(this.af.database.list("/mapvotes").update(this.key, action.payload) as Promise)
                .map(() => new NoopAction());
        }) as Observable<any>;

    @Effect()
    public reset$(): Observable<Action> {

        return this.actions$
            .ofType(mapvote.ActionTypes.RESET)
            .mergeMap((action: mapvote.ResetMapAction) => {
                return this.store.let(getMapVote).take(1).map((mapVote: MapVote) => {
                    let mapVoteClone: MapVote = Object.assign({}, mapVote, {
                        banned: [],
                        selected: []
                    });

                    return new mapvote.UpdateMapAction(removeFirebaseProperties(mapVoteClone));
                });
            }) as Observable<Action>;
    }

    @Effect()
    public select$(): Observable<Action> {

        return this.actions$
            .ofType(mapvote.ActionTypes.SELECT)
            .mergeMap((action: mapvote.SelectMapAction) => {
                return this.store.let(getMapVote).take(1).map((mapVote: MapVote) => {
                    let mapVoteClone: MapVote = Object.assign({}, mapVote, {
                        selected: [...mapVote.selected || [], {name: action.payload.name}]
                    });

                    return new mapvote.UpdateMapAction(removeFirebaseProperties(mapVoteClone));
                });
            }) as Observable<Action>;
    }

    @Effect()
    public ban$(): Observable<Action> {

        return this.actions$
            .ofType(mapvote.ActionTypes.BAN)
            .mergeMap((action: mapvote.BanMapAction) => {
                return this.store.let(getMapVote).take(1).map((mapVote: MapVote) => {
                    let mapVoteClone: MapVote = Object.assign({}, mapVote, {
                        banned: [...mapVote.banned || [], {name: action.payload.name}]
                    });

                    return new mapvote.UpdateMapAction(removeFirebaseProperties(mapVoteClone));
                });
            });
    }
}