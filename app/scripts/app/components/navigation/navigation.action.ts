import {Action} from "@ngrx/store";
import {type} from "../../../util";

export const ActionTypes = {
    OPEN_SIDENAV: type("[Navigation] Open Sidenav"),
    CLOSE_SIDENAV: type("[Navigation] Close Sidenav")
};

export class OpenSidenavAction implements Action {
    public type = ActionTypes.OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
    public type = ActionTypes.CLOSE_SIDENAV;
}

export type Actions
    = OpenSidenavAction
    | CloseSidenavAction;