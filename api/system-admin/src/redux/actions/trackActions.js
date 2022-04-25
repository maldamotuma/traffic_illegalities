import { TRACKCAR } from "../ActionTypes";

export const track_car = carInfo => dispatch => {
    dispatch({
        type: TRACKCAR,
        payload: carInfo
    });
}