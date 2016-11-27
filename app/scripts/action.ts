import {Action} from "@ngrx/store";
import {type} from "./util";

export const ActionTypes = {
    NOOP: type("[NOOP]")
};

export class NoopAction implements Action {
    public type = ActionTypes.NOOP;
}
export type Actions = NoopAction;