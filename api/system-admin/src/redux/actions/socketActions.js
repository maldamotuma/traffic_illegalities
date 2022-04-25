import { ADD_SOCKET_INFO, ADDONLINEUSERS } from "../ActionTypes";
import axios from "../caxios";

export const add_socket_info = skt => dispatch => {
    return dispatch({
        type: ADD_SOCKET_INFO,
        payload: skt
    });
}

export const online_users = users => dispatch => {
    return dispatch({
        type:ADDONLINEUSERS,
        payload: users
    });
}