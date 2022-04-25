import { ADDNEWSPEED, ADDNEWSPEEDCOORDINATES, DELETECOORDINATE } from "../ActionTypes";

export const add_new_speed = speed => dispatch => {
    dispatch({
        type: ADDNEWSPEED,
        payload: speed
    });
}

export const add_new_speed_coordinates = coordinates => dispatch => {
    dispatch({
        type: ADDNEWSPEEDCOORDINATES,
        payload: coordinates
    });
}

export const reduceCoordinate = coordinate => dispatch => {
    dispatch({
        type: DELETECOORDINATE,
        payload: coordinate
    });
}