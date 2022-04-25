import { SETADMIN, UPDATEONETIME } from "../ActionTypes";

export const UseraccountReducers = (state = -1, action) => {
    switch (action.type) {
        case SETADMIN:
            return action.payload;
        case UPDATEONETIME:
            return {...state, oneTime: action.payload};
        default:
            return state;
    }
}