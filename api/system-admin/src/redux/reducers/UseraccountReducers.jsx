import { CURRENT_USER } from "../ActionTypes";

export const UseraccountReducers = (state = {}, action) => {
    switch (action.type) {
        case CURRENT_USER:
            return action.payload;
        default:
            return state;
    }
}