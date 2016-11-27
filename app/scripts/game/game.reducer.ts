import {compose} from "@ngrx/core/compose";
import "@ngrx/core/add/operator/select";
import {Observable} from "rxjs/Observable";
import * as game from "./game.action";
import {State as RootState} from "../reducers";
import {Game} from "./game.model";

export interface State {
    games: Game[];
    selectedGame: Game;
}

const initialState: State = {
    games: [],
    selectedGame: null,
};

export function reducer(state = initialState, action: game.Actions): State {
    switch (action.type) {
        case game.ActionTypes.LOAD:
            return state;

        case game.ActionTypes.LOAD_COMPLETE:
            return Object.assign({}, state, {
                games: action.payload
            });

        case game.ActionTypes.CREATE:
            return state;

        case game.ActionTypes.SELECT:
            return state;

        case game.ActionTypes.SELECTED:
            return Object.assign({}, state, {
                selectedGame: (action as game.SelectedGameAction).payload
            });

        case game.ActionTypes.UPDATE:
            return state;

        default:
            return state;
    }
}

function getEntities(state$: Observable<State>) {
    return state$.select((state: State) => state.games);
}

function getSelectedEntity(state$: Observable<State>) {
    return state$.select((state: State) => state.selectedGame);
}

function getGameState(state$: Observable<RootState>) {
    return state$.select(s => s.game);
}

export const getGames = compose(getEntities, getGameState);
export const getSelectedGame = compose(getSelectedEntity, getGameState);
