import { SEARCHEDLOCATION } from "../ActionTypes";

export const setLocation = loc => dispatch => {
    dispatch({
        type: SEARCHEDLOCATION,
        payload: loc
    });
}