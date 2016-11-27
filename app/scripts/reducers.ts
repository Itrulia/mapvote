import {routerReducer, RouterState} from "@ngrx/router-store";
import * as navigation from "./app/components/navigation/navigation.reducer";
import * as game from "./game/game.reducer";
import * as mapvote from "./mapvote/mapvote.reducer";

export const reducers = {
    router: routerReducer,
    navigation: navigation.reducer,
    game: game.reducer,
    mapvote: mapvote.reducer
};

export interface State {
    router: RouterState;
    navigation: navigation.State;
    game: game.State;
    mapvote: mapvote.State;
}