import {Action} from "@ngrx/store";
import {type} from "../util";
import {Game} from "./game.model";

export const ActionTypes = {
    LOAD: type("[Game] Load"),
    LOAD_COMPLETE: type("[Game] Load Complete"),
    SELECT: type("[Game] Select Game"),
    SELECTED: type("[Game] Selected Game"),

    CREATE: type("[Game] Create Game"),
    UPDATE: type("[Game] Update Game"),
    DELETE: type("[Game] Delete Game"),
};

export class SelectGameAction implements Action {
    public type = ActionTypes.SELECT;

    constructor(public key: string) {}
}

export class SelectedGameAction implements Action {
    public type = ActionTypes.SELECTED;

    constructor(public payload: Game) {}
}

export class CreateGameAction implements Action {
    public type = ActionTypes.CREATE;

    constructor(public payload: Game) {}
}

export class UpdateGameAction implements Action {
    public type = ActionTypes.UPDATE;

    constructor(public key: string, public payload: Game) {}
}

export class DeleteGameAction implements Action {
    public type = ActionTypes.DELETE;

    constructor(public key: string) {}
}

export class LoadGamesAction implements Action {
    public type = ActionTypes.LOAD;

    constructor() {}
}

export class LoadGamesCompleteAction implements Action {
    public type = ActionTypes.LOAD_COMPLETE;

    constructor(public payload: Game[]) {}
}

export type Actions = SelectGameAction | SelectedGameAction | CreateGameAction | UpdateGameAction | DeleteGameAction | LoadGamesAction | LoadGamesCompleteAction;