import { FETCHCRASHREPORT } from "../ActionTypes";

export const crash_reducer = (state = [], action) => {
    switch (action.type) {
        case FETCHCRASHREPORT:
            return action.payload;
        default:
            return state;
    }
}