import { FETCHRULES } from "../ActionTypes";

const initialState = [];

export const rules_reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHRULES:
            return action.payload;
        default:
            return state;
    }
}