import { ADDNEWTRAFFICPOLICE } from "../ActionTypes";
import axios from "../caxios";

export const add_traffic_police = traffic_police_info => dispatch => {
    dispatch({
        type: ADDNEWTRAFFICPOLICE,
        payload: traffic_police_info
    });
}