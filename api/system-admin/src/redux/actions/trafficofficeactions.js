import axios from "../caxios";
import { ADDTRAFFICOFFICE } from "../ActionTypes";
import { formdataGenerator } from "./helper";

export const add_traffic_office = tr_of => dispatch => {
    dispatch({
        type: ADDTRAFFICOFFICE,
        payload: tr_of
    });
}

export const submit_traffic_office = (setscreen) => async(dispatch, getState) => {
    try {
        const TRO = getState().traffic_office.newTO;
        const formdata = formdataGenerator(TRO);
        const res = await axios.post("/add-traffic-office", formdata);
        setscreen("form");
    } catch (error) {
        alert("error");
    }
}