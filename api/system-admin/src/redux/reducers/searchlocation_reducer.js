import { SEARCHEDLOCATION } from "../ActionTypes";

export const search_location_reducer = (state = null, action) => {
    switch (action.type) {
        case SEARCHEDLOCATION:
            return action.payload
        default:
            return state;
    }
}