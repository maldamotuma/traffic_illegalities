import { SETADMIN } from "../ActionTypes";

export const UseraccountReducers = (state = -1, action) => {
    switch (action.type) {
        case SETADMIN:
            return action.payload;
        default:
            return state;
    }
}