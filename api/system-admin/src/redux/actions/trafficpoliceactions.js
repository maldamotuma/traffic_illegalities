import { ADDNEWTRAFFICPOLICE, FETCHTRAFFICPOLICES } from "../ActionTypes";
import axios from "../caxios";
import { formdataGenerator } from "./helper";

export const add_traffic_police = traffic_police_info => dispatch => {
    dispatch({
        type: ADDNEWTRAFFICPOLICE,
        payload: traffic_police_info
    });
}

export const submit_new_traffic_police = setScreen => async (dispatch, getState) => {
    const trafficPolice = getState().newTrafficPolice.newTrafficPolice;
    const formdata = formdataGenerator(trafficPolice);
    const res = await axios.post("/add-traffic-police", formdata);
    if (res.data.success === 1) {
        setScreen("success");
        // dispatch({
        //     type: ADDNEWTRAFFICPOLICE,
        //     payload: traffic_police_info
        // });
    }
}

export const fetch_trafficpolices = () => async dispatch => {
    const res = await axios.get("/traffic-polices");
    if (res.data.success === 1) {
        dispatch({
            type: FETCHTRAFFICPOLICES,
            payload: res.data.trafficpolices
        });
    }
}