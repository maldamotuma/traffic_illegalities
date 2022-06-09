import { ADDNEWSPEED, ADDNEWSPEEDCOORDINATES, DELETECOORDINATE, SPEEDLIMITSLIST } from "../ActionTypes";
import axios from "../caxios";
import { login_form } from "../helpers";

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

export const submit_new_speed_limit = setScreen => async(dispatch, getState) => {
    const { newSpeed } = getState().speed;
    const res = await axios.post("/add-speed", newSpeed);
    if (res.data.success === 1) {
        setScreen("success");
    } else if (res.data.success === -1) {
        login_form(dispatch);
    }
    // dispatch({
    //     type: DELETECOORDINATE,
    //     payload: coordinate
    // });
}

export const fetch_speed_limits = () => async dispatch => {
    const res = await axios.get("/speed-limits");
    if (res.data.success === 1) {
        dispatch({
            type: SPEEDLIMITSLIST,
            payload: res.data.speedlimits
        });
    }
}