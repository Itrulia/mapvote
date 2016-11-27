import {compose} from "@ngrx/core/compose";
import "@ngrx/core/add/operator/select";
import {Observable} from "rxjs/Observable";
import * as mapvote from "./mapvote.action";
import {State as RootState} from "../reducers";
import {MapVote} from "./mapvote.model";

export interface State {
    mapvote: MapVote;
    isLoading: boolean;
}

const initialState: State = {
    mapvote: null,
    isLoading: false
};

export function reducer(state = initialState, action: mapvote.Actions): State {
    switch (action.type) {
        case mapvote.ActionTypes.UNBAN:
            return state;

        case mapvote.ActionTypes.BAN:
            return state;

        case mapvote.ActionTypes.DESELECT:
            return state;

        case mapvote.ActionTypes.SELECT:
            return state;

        case mapvote.ActionTypes.RESET:
            return state;

        case mapvote.ActionTypes.LOAD:
            return Object.assign({}, state, {
                isLoading: true
            });

        case mapvote.ActionTypes.LOADED:
            return Object.assign({}, state, {
                mapvote: action.payload,
                isLoading: false
            });

        default:
            return state;
    }
}

function getEntity(state$: Observable<State>) {
    return state$.select((state: State) => state.mapvote);
}

function getMapVoteState(state$: Observable<RootState>) {
    return state$.select(s => s.mapvote);
}

export const getMapVote = compose(getEntity, getMapVoteState);
