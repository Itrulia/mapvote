import "@ngrx/core/add/operator/select";
import {Observable} from "rxjs/Observable";
import * as navigation from "./navigation.action";
import {State as RootState} from "../../../reducers";

export interface State {
    showSidenav: boolean;
}

const initialState: State = {
    showSidenav: false,
};

export function reducer(state = initialState, action: navigation.Actions): State {
    switch (action.type) {
        case navigation.ActionTypes.CLOSE_SIDENAV:
            return {
                showSidenav: false
            };

        case navigation.ActionTypes.OPEN_SIDENAV:
            return {
                showSidenav: true
            };

        default:
            return state;
    }
}

export function getShowSidenav(state$: Observable<RootState>) {
    return state$.select(state => state.navigation.showSidenav);
}