import {Action} from "@ngrx/store";
import {type} from "../util";
import {MapVote} from "./mapvote.model";
import {Map} from "../game/game.model";

export const ActionTypes = {
    LOAD: type("[Mapvote] Load"),
    LOADED: type("[Mapvote] Loaded"),

    BAN: type("[Mapvote] Ban"),
    UNBAN: type("[Mapvote] Un ban"),

    SELECT: type("[Mapvote] Select"),
    DESELECT: type("[Mapvote] Deselect"),

    UPDATE: type("[Mapvote] Update"),
    RESET: type("[Mapvote] Reset")
};

export class LoadMapAction implements Action {
    public type = ActionTypes.LOAD;

    constructor() {}
}

export class LoadedMapAction implements Action {
    public type = ActionTypes.LOADED;

    constructor(public payload: MapVote) {}
}

export class BanMapAction implements Action {
    public type = ActionTypes.BAN;

    constructor(public payload: Map) {}
}

export class UnbanMapAction implements Action {
    public type = ActionTypes.UNBAN;

    constructor(public payload: Map) {}
}

export class SelectMapAction implements Action {
    public type = ActionTypes.SELECT;

    constructor(public payload: Map) {}
}

export class DeselectMapAction implements Action {
    public type = ActionTypes.DESELECT;

    constructor(public payload: Map) {}
}

export class UpdateMapAction implements Action {
    public type = ActionTypes.UPDATE;

    constructor(public payload: MapVote) {}
}

export class ResetMapAction implements Action {
    public type = ActionTypes.RESET;

    constructor() {}
}

export type Actions = LoadMapAction |
    LoadedMapAction |
    BanMapAction |
    UnbanMapAction |
    SelectMapAction |
    DeselectMapAction |
    UpdateMapAction |
    ResetMapAction;